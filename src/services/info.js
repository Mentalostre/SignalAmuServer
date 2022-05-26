import {get_info_db, post_info_db} from "../models/info.js";

const post_info_service = async (req, res)=>{
    let tel = req.body.tel;
    let info_mail = req.body.info_email;
    let info_desc = req.body.info_desc;
    let mail = req.session.mail;
    let result = await info_insert(tel, info_mail, info_desc, mail);
    res.send({res:result});
};

const info_insert = async (tel, info_mail, info_desc, mail)=>{
    try {
        await post_info_db(tel, info_mail, info_desc, mail);
        return 1;
    }catch (err){
        console.log(err);
        return 69;
    }
}

const get_info_service = async (req, res)=>{
    let result = await get_info_db();
    res.send({res:1, infos:result});
}


export { post_info_service, get_info_service };