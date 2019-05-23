import * as https from "https";
import * as fs from "fs";

export default function(app) {
    if (app.get('ssl')) {
        const opts = {
            key: fs.readFileSync(app.get('ssl')['key']),
            cert: fs.readFileSync(app.get('ssl')['cert'])
        };
	    
        const server = https.createServer(opts, app).listen(app.get('port'));
        app.setup(server);
    }
}