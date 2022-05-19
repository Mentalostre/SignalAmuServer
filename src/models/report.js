import {pool} from "../config/database/database-config.js";

const insert_post_query = "INSERT INTO report (report_desc, report_level, report_date, location_lat, location_long, tag_id, producer_id) VALUES (?,?,NOW(),?,?,?,(SELECT id FROM producer WHERE user_id = (SELECT id FROM user WHERE user_email=?)))";

const get_query = "SELECT t1.id, t1.report_desc description, t1.report_level level, t1.report_date date, t1.location_lat, t1.location_long, status, t2.tag_name, t3.first_name, t3.last_name, t3.user_email FROM report t1 INNER JOIN tag t2 ON t1.tag_id = t2.id INNER JOIN user t3 ON (SELECT user_id FROM producer WHERE id = t1.producer_id  ) = t3.id WHERE t1.status = 0;";

const report_post_db = (data)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = conn.query(insert_post_query, [data.desc, data.level, data.location_lat, data.location_long, data.tag_id, data.mail]);
            await conn.release();
            resolve(result);
        }catch (err){
            reject(err);
        }
    })
}

const report_get_db = ()=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(get_query);
            await conn.release();
            resolve(result);
        }catch (err){
            reject(err);
        }
    })
}

export {
    report_post_db,
    report_get_db
};