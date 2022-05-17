import {pool} from "../config/database/database-config.js";

const get_password_query = "SELECT password FROM user WHERE user_email = ?";

const signin_db = async (mail)=>{
    let conn = await pool.getConnection();
    return new Promise(async (resolve, reject)=>{
        try{

            let result = await conn.query(get_password_query, [mail]);
            resolve(result[0]);
        }catch (err){
            reject(err);
        }
    })



};

export {signin_db};