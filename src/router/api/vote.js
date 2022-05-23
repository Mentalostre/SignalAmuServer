import {is_registered} from "../../services/isRegistered.js";
import {vote_post_service, is_valid_post_vote} from "../../services/vote.js";
import bodyParser from "body-parser";

export const vote = (router)=>{
    router.post('/api/vote', bodyParser.urlencoded({extended:true}), is_registered, is_valid_post_vote, vote_post_service);

}
