import bodyParser from 'body-parser'

import {signup_service, is_valid_req_signup_service, is_amu_email} from "../../services/signup.js";



export const connection = (router)=>{
    router.post('/api/signup',
        bodyParser.urlencoded({ extended: true }),
        is_valid_req_signup_service,
        is_amu_email,
        signup_service);
}