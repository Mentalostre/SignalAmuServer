import {signup_service, is_valid_req_signup_service} from "../../services/signup.js";

export const connection = (router)=>{
    router.post('/api/signup', is_valid_req_signup_service, signup_service);
}