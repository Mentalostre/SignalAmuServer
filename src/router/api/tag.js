import bodyParser from "body-parser";
import {post_tag_service, is_valid_post_tag, get_tag_service} from "../../services/tag.js";
import {is_registered} from "../../services/isRegistered.js";

export const tag = (router)=>{
    router.post('/api/tag', bodyParser.urlencoded({extended:true}), is_registered ,is_valid_post_tag, post_tag_service);
    router.get('/api/tag', is_registered, get_tag_service);
}

