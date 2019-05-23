import * as https from "https";

export default function(app) {
    if (app.get('ssl')) {
        const opts = {
            key: app.get('ssl')['key'],
            cert: app.get('ssl')['cert']
        };
        console.log(opts)
    
        const server = https.createServer(opts, app);
        app.setup(server);
    }
}