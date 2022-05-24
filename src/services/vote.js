import {post_vote_db} from "../models/vote.js";
import {emit_new_report} from "../config/socket/socket-config.js";

const vote_post_service = async (req, res)=>{
    let mail = req.session.mail;
    let report_id = req.body.report_id;
    let vote_value = req.body.vote_value;
    let result = await post_vote(vote_value, report_id, mail);
    if(result===1){
        emit_new_report();
    }
    res.send({res:result});
}

const post_vote = async (vote_value, report_id, mail)=>{
    try {
        await post_vote_db(vote_value, report_id, mail);
        return 1;
    }catch (err){
        console.log(err);
        return 69;
    }
}

const is_valid_post_vote = (req, res, next)=>{
    if(req.body.report_id && req.body.vote_value) next();
    else req.send({res:50});
}

export{ vote_post_service, is_valid_post_vote }