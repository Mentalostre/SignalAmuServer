import {pool} from "../config/database/database-config.js";

const post_query = 'INSERT INTO consumer (user_id) VALUES (?)';


const post_consumer_db = (id)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            await conn.query(post_query,[id])
            await conn.release();
            resolve()
        }catch (err){
            reject(err);
        }
    })
}

export {post_consumer_db}