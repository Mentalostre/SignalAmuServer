import {pool} from "../config/database/database-config.js";

const insert_post_query = "INSERT INTO report (report_desc, report_level, report_date, location_lat, location_long, tag_id, producer_id) VALUES (?,?,NOW(),?,?,?,(SELECT id FROM producer WHERE user_id = (SELECT id FROM user WHERE user_email=?)))";


const report_post_db = (data)=>{
    const conn = pool.getConnection();
    return new Promise(async (resolve, reject)=>{
        try {
            let result = (await conn).query(insert_post_query, [data.desc, data.level, data.location_lat, data.location_long, data.tag_id, data.mail]);
            resolve(result);
        }catch (err){
            reject(err);
        }
    })
}

export {
    report_post_db
};