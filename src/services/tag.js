import {post_tag_db, get_tag_db} from "../models/tag.js";

const post_tag_service = async (req, res)=>{
    let result = await insert_tag(req.body.tag_name);
    res.send({res:result});
}

const get_tag_service = async (req, res)=>{
    let result = await get_tag();
    res.send(result)
}

const get_tag = async ()=>{
    try {
        let result = await get_tag_db();
        let tags = [];
        result.forEach((obj)=>{
            tags.push(obj)
        })
        return {res: 1, tags};
    }catch (err){
        return {res:69};
    }
}

const insert_tag = async (tag_name)=>{
    try {
        let result = await post_tag_db(tag_name);
        return 1;
    }catch (e) {
        if(e.errno === 1062){
            return 100
        }
        return 69;
    }
}

const is_valid_post_tag = (req, res, next)=>{
    if(req.body.tag_name) next();
    else{
        res.send({res:50});
    }
}

export { post_tag_service, is_valid_post_tag, get_tag_service }