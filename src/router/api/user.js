import bodyParser from "body-parser";
import {is_registered} from "../../services/isRegistered.js";
import {get_user_service} from "../../services/user.js";

export const user = (router)=>{
    router.get('/api/myinfo', is_registered, bodyParser.urlencoded({extended:true}), get_user_service)
}

