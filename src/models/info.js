import {pool} from "../config/database/database-config.js";

const call_info_query = 'CALL insert_info (?,?,?,?)';
const get_info_query = 'SELECT c.id consumer_id, i.tel tel, i.info_email, i.info_desc, u.user_email, u.first_name, u.last_name  FROM consumer c INNER JOIN info i on c.id = i.consumer_id INNER JOIN user u on c.user_id = u.id;'

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

const get_info_db = ()=>{
    return new Promise(async(resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = conn.query(get_info_query);
            await conn.release();
            resolve(result);

        }catch (err){
            reject(err);
        }
    })
}

export {post_info_db, get_info_db};