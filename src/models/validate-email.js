import {pool} from "../config/database/database-config.js";

const sql_query_validate_email = "SELECT (last_name) FROM user WHERE key_verification = ?";
const sql_query_update_user_status = "UPDATE user SET is_verified = 1 WHERE key_verification = ?"

const validate_email_db = async (key)=>{
  let conn = await pool.getConnection();
  return new Promise(async (resolve, reject)=>{
    try {
      let result = await conn.query(sql_query_validate_email, [key]);
      await conn.release();
      resolve(result);
    }catch (err){
      reject(err);
    }
  });
};

const update_user_status_db = async(key)=>{
  let conn = await pool.getConnection();
  return new Promise(async (resolve, reject)=>{
    try {
      await conn.query(sql_query_update_user_status, [key]);
      await conn.release();
      resolve();
    }
    catch (err){
      reject(err);
    }
  })
};

export {validate_email_db, update_user_status_db};