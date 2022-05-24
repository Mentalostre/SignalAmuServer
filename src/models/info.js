import {pool} from "../config/database/database-config.js";

const call_info_query = 'CALL insert_info (?,?,?,?)';

const post_info_db = (tel, mail_info, info_desc, mail)=>{
    return new Promise(async(resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            await conn.query(call_info_query, [tel, mail_info, info_desc, mail]);
            await conn.release();
            resolve();
        }catch (err){
            reject(err);
        }
    })
}

export {post_info_db};