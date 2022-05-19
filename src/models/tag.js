import {pool} from "../config/database/database-config.js";

const insert_tag_query = "INSERT INTO tag (tag_name) VALUES (?)";
const get_tag_query = "SELECT * FROM tag";

const post_tag_db = (tag_name)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(insert_tag_query, [tag_name]);
            await conn.release();
            resolve(result);

        }catch (err){
            reject(err);
        }
    })
}

const get_tag_db = ()=>{

    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(get_tag_query);
            await conn.release();
            resolve(result);
        }catch (err){
            reject(err);
        }
    })


}

export {post_tag_db, get_tag_db}