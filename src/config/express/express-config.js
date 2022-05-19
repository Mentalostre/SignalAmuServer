// fichier de configuration pour express

import express from 'express';
import {cookieSessionConfig} from "../cookie/cookie-session-config.js";
import {io_config} from "../socket/socket-config.js";

export function express_config(){
    let app = express();
    // set middleware here

    app.use(cookieSessionConfig);

    io_config(app);

    return app;
}

