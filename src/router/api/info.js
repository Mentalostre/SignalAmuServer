import bodyParser from "body-parser";
import {post_info_service} from "../../services/info.js";
import {is_registered_admin} from "../../services/isRegistered.js";

export const info = (router)=>{
    router.post('/api/info', bodyParser.urlencoded({extended:true}), is_registered_admin, post_info_service);
}
