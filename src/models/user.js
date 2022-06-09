import {pool} from "../config/database/database-config.js";


const query_get = "SELECT user.id, user_email email, first_name, last_name, is_verified, c.id consumer_id  FROM user left join consumer c on user.id = c.user_id;"
const query_get_solo1 = "SELECT first_name, last_name, c.id consumer_id  FROM user left join consumer c on user.id = c.user_id WHERE user_email=?"


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

export const get_user_solo_db = (mail)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        let res = {};
        try {
            let result = await conn.query(query_get_solo1 , [mail])
            res.first_name = result[0].first_name;
            res.last_name = result[0].last_name;
            let consumer_id = result[0].consumer_id;
            if(consumer_id == null){
                res.consumer_id = null;
                await conn.release();
                resolve(res);
                return;
            }
            result = await conn.query('SELECT info_desc, info_email, tel FROM info JOIN consumer c on c.id = info.consumer_id WHERE consumer_id = ?', [consumer_id]);
            res.info_desc = result[0].info_desc;
            res.info_email = result[0].info_email;
            res.consumer_id = consumer_id;
            res.tel = result[0].tel;
            resolve(res)
        }catch (err){
            reject(err);
        }
    })
}