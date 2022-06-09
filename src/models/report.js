import {pool} from "../config/database/database-config.js";
import {report} from "../router/api/report.js";

const insert_post_query = "INSERT INTO report (report_desc, report_level, report_date, location_lat, location_long, tag_name, producer_id) VALUES (?,?,?,?,?,?,(SELECT id FROM producer WHERE user_id = (SELECT id FROM user WHERE user_email=?)))";

const get_query = "SELECT t1.id, t1.report_desc description, t1.report_level level, t1.report_date date, t1.location_lat, t1.location_long, status, t1.consumer_id ,t1.tag_name, getVote(t1.id) vote_count ,t3.first_name, t3.last_name, t3.user_email FROM report t1 INNER JOIN user t3 ON (SELECT user_id FROM producer WHERE id = t1.producer_id  ) = t3.id";

const validate_report_query = "UPDATE report SET status = 1 WHERE id = ?";
const validate_report_query_set_consumer = "UPDATE report SET consumer_id = (SELECT id FROM consumer WHERE user_id = (SELECT id FROM user WHERE user_email=?)) WHERE id=?";

const post_picture_query = 'INSERT INTO image (image_name, report_id, producer_id) VALUE(?, ?, (SELECT id FROM producer WHERE user_id = (SELECT id FROM user WHERE user_email=?)))'

const get_picture_query = 'SELECT image_name FROM image where report_id = ?'

const report_validate_post = (report_id, mail)=>{
    return new Promise(async(resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            await conn.query(validate_report_query, [report_id]);
            await conn.query(validate_report_query_set_consumer,[mail, report_id]);
            await conn.release();
            resolve();
        }catch (err){
            reject(err);
        }
    })
}

const report_post_db = (data)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        const date = Date.now();
        try {
            let result = await conn.query(insert_post_query, [data.desc, data.level,date,data.location_lat, data.location_long, data.tag_name, data.mail]);
            await conn.release();
            resolve(result.insertId);
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

const post_image_db = (picture_name, report_id, mail)=>{
    return new Promise(async(resolve,reject)=>{
        const conn = await pool.getConnection();
        try {
            await conn.query(post_picture_query, [picture_name, report_id, mail]);
            await conn.release();
            resolve();
        }catch (err){
            reject(err);
        }

    })
}

const get_image_name_db = (report_id)=>{
    return new Promise(async (resolve, reject)=>{
        const conn = await pool.getConnection();
        try {
            let result = await conn.query(get_picture_query, [report_id]);
            await conn.release();
            resolve(result);
        }catch (err){
            reject(err);
        }
    })
}

export {
    report_post_db,
    report_get_db,
    report_validate_post,
    post_image_db,
    get_image_name_db
};