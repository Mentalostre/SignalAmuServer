// fichier de configuration pour express

import express from 'express';
import {cookieSessionConfig} from "../cookie/cookie-session-config.js";

export function express_config(){
    let app = express();
    // set middleware here

    app.use(cookieSessionConfig);

    return app;
}

