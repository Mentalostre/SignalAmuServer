import {pool} from "../config/database/database-config.js";


const query_get = "SELECT user.id, user_email email, first_name, last_name, is_verified, c.id consumer_id  FROM user left join consumer c on user.id = c.user_id;"

export const get_user_db = ()=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await pool.getConnection();
            let result = await conn.query(query_get);
            await conn.release();
            resolve(result);
        }catch (err){
            reject(err);
        }
    })
}