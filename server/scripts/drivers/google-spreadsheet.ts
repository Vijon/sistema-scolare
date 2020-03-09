const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');


/*
https://www.googleapis.com/auth/drive
See, edit, create, and delete all of your Google Drive files
https://www.googleapis.com/auth/drive.appdata
View and manage its own configuration data in your Google Drive
https://www.googleapis.com/auth/drive.file
View and manage Google Drive files and folders that you have opened or created with this app
https://www.googleapis.com/auth/drive.metadata
View and manage metadata of files in your Google Drive
https://www.googleapis.com/auth/drive.metadata.readonly
View metadata for files in your Google Drive
https://www.googleapis.com/auth/drive.photos.readonly
View the photos, videos and albums in your Google Photos
https://www.googleapis.com/auth/drive.readonly
See and download all your Google Drive files
https://www.googleapis.com/auth/drive.scripts
*/
// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TEMP_PATH = path.resolve(__dirname, 'temp');
const CREDENTIALS_PATH = path.resolve(TEMP_PATH, 'google-drive.json');
const TOKEN_PATH = path.resolve(TEMP_PATH, 'token.json');

var fileId;
export const readSheet = ({file_id, sheets}) => {
    return new Promise<string>(resolve => {
        fileId = file_id;
        // Load client secrets from a local file.
        fs.readFile(CREDENTIALS_PATH, (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), async (auth) => {
                const data = await listMajors(auth, sheets);
                resolve( data as any );
            });
        });
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth, sheets) {
    return new Promise( (resolve, reject) => {
        const engine = google.sheets({ version: 'v4', auth });
        var data = {};
        var promises = [] as Promise<any>[];
        sheets.forEach( async (s) => {
            promises.push( getSheet(engine, s) );
        });
        Promise.all( promises ).then( results => {
            results.forEach( (r,i) => {
                data[sheets[i]] = r;
            });
            resolve(data);
        });
    });
}

function getSheet( engine, sheet ) {
    return new Promise( (resolve, reject) => {
        engine.spreadsheets.values.get({
            spreadsheetId: fileId,
            range: sheet,
        }, (err, res) => {
            if (err) { 
                reject();
                return console.log('The API returned an error: ' + err);
            };
            const rows = res.data.values;
            // transform into literal objects
            const columns = rows[0];
            const data = rows.slice(1).map(vv => {
                var obj = {};
                columns.forEach((k, i) => obj[k] = normalize(vv[i]))
                return obj;
            });
            resolve(data);
        });
    });
}

function normalize( v ) {
    if (!v) {
        v = null;
    }
    return v;
}