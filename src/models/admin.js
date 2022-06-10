import {pool} from "../config/database/database-config.js";

const post_query = 'INSERT INTO consumer (user_id) VALUES (?)';
const post_query_remove = 'DELETE FROM consumer WHERE user_id = ?'


const post_consumer_db = (id)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(post_query,[id])
            await conn.query('INSERT INTO info (tel, info_email, info_desc, consumer_id) VALUES (null,null,null,?)', [result.insertId] )
            await conn.release();
            resolve(result.insertId)
        }catch (err){
            reject(err);
        }
    })
}

const post_consumer_remove_db = (id)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(post_query_remove,[id])
            await conn.release();
            resolve()
        }catch (err){
            reject(err);
        }
    })
}

export {post_consumer_db, post_consumer_remove_db}