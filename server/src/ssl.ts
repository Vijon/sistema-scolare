import * as https from "https";
import * as fs from "fs";
import logger from './logger';

export default function(app) {
    const port = app.get('port');
    var server, opts, isHttps;
    if (app.get('ssl')) {
        try {
            opts = {
                key: fs.readFileSync(app.get('ssl')['key']),
                cert: fs.readFileSync(app.get('ssl')['cert'])
            };
            isHttps = true;
        } catch(e) {
            console.log(`SSL Certificates not found`)
        }
    }
    if (isHttps) {
        server = https.createServer(opts, app).listen(port);
        app.setup(server);

        server.on('listening', () =>
            logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
        );
    } else {
        server = app.listen(port);
        server.on('listening', () =>
            logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
        );
    }
}