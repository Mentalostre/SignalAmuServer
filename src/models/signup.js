import {pool} from "../config/database/database-config.js";

const signup_query = "INSERT into user (user_email, password, first_name, last_name, key_verification) VALUES (?, ?, ?, ?, ?)";
const insert_producer = "INSERT INTO producer (user_id) VALUES (?)";

const signup_db =  async (data)=>{
    let insert_data = [data.mail, data.password, data.first_name, data.last_name, data.key];
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(signup_query, insert_data);
            let lastID = Number(result.insertId);
            await conn.query(insert_producer, [lastID]);
            await conn.release();
            resolve();
        }catch (err){
            reject(err);
        }
    });
};

export {signup_db};