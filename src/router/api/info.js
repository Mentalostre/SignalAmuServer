import bodyParser from "body-parser";
import {get_info_service, post_info_service} from "../../services/info.js";
import {is_registered_admin, is_registered} from "../../services/isRegistered.js";

export const info = (router)=>{
    router.post('/api/info', bodyParser.urlencoded({extended:true}), is_registered_admin, post_info_service);
    router.get('/api/info', is_registered, get_info_service);
}
