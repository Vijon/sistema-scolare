import * as https from "https";
import * as fs from "fs";
import logger from './logger';

export default function(app) {
    const port = app.get('port');
    var server;
    if (app.get('ssl')) {
        const opts = {
            key: fs.readFileSync(app.get('ssl')['key']),
            cert: fs.readFileSync(app.get('ssl')['cert'])
        };
	    
        server = https.createServer(opts, app).listen(port);
        app.setup(server);
    } else {
        server = app.listen(port);
    }
    server.on('listening', () =>
        logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
    );
}