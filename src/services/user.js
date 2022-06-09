import {get_user_solo_db} from "../models/user.js";


const get_user_service = async(req , res)=>{
    let mail = req.session.mail;
    let result = await get_user_solo_db(mail);
    res.send({res:1, data:result});
}


export {get_user_service}