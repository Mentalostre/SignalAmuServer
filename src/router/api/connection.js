import bodyParser from 'body-parser'

import {signup_service, is_valid_req_signup_service, is_amu_email} from "../../services/signup.js";
import {signin_service} from "../../services/signin.js";


export const connection = (router)=>{
    router.post('/api/signup',
        bodyParser.urlencoded({ extended: true }),
        is_valid_req_signup_service,
        is_amu_email,
        signup_service);

    router.post('/api/signin',
        bodyParser.urlencoded({extended:true}),
        is_valid_req_signup_service,
        signin_service)
}