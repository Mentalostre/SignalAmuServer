import {pool} from "../config/database/database-config.js";

const call_insert_query = 'CALL insert_vote(?,?,?)';

const post_vote_db = (vote_value, report_id, mail)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            await conn.query(call_insert_query, [vote_value, report_id, mail]);
            await conn.release();
            resolve();
        }catch (err){
            reject(err);
        }
    })
}

export {post_vote_db};