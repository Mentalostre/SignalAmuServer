import {default as api} from './api/api.js'
import {error404_service} from "../services/error404.js";
import {email_validator_service} from "../services/email-validator.js";
import bodyParser from "body-parser";

export const api_endpoint = (rooter)=>{
    rooter.get('/', error404_service);
    rooter.get('/validate-email/:user/:vc', email_validator_service);
    rooter.get('/admin/connection', bodyParser.urlencoded({extended:true}) )
    api(rooter)

}

