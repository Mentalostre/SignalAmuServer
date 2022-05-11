import {pool} from "../config/database/database-config.js";

const signup_query = "INSERT into user (user_email, password, first_name, last_name, key_verification) VALUES (?, ?, ?, ?, ?)";

const signup_db =  async (data)=>{
    let conn = await pool.getConnection();
    let insert_data = [data.mail, data.password, data.first_name, data.last_name, data.key];
    return new Promise(async (resolve, reject)=>{
        try {
            let result = await conn.query(signup_query, insert_data).then(()=>{
                conn.release();
            });
        }catch (err){
            reject(err);
        }
    });
};

export {signup_db};