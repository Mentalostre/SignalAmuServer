import {pool} from "../config/database/database-config.js";

const insert_tag_query = "INSERT INTO tag (tag_name) VALUES (?)";
const get_tag_query = "SELECT * FROM tag";

const post_tag_db = (tag_name)=>{
    const conn = pool.getConnection();
    return new Promise(async (resolve, reject)=>{
        try {
            let result = (await conn).query(insert_tag_query, [tag_name]);
            resolve(result);

        }catch (err){
            reject(err);
        }
    })
}

const get_tag_db = ()=>{
    const conn = pool.getConnection();
    return new Promise(async (resolve, reject)=>{
        try {
            let result = (await conn).query(get_tag_query);
            resolve(result);
        }catch (err){
            reject(err);
        }
    })


}

export {post_tag_db, get_tag_db}