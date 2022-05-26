import {report_post_db, report_get_db, report_validate_post, post_image_db} from "../models/report.js";
import fs from 'fs';
import {emit_new_report} from "../config/socket/socket-config.js";

const report_service = async (req, res)=>{
    let data = {
        desc: req.body.desc,
        level: req.body.level,
        location_lat: req.body.location_lat,
        location_long: req.body.location_long,
        tag_id: req.body.tag_id,
        mail: req.session.mail
    };
    let result = await insert_data_report(data);
    if(result ===1){
        emit_new_report();
    }
    res.send({
        res:result
    })
};

const post_validate_report = async (req, res)=>{
    await report_validate_post(req.query.report_id);
    res.send({res:1});
}

const is_valid_post_validate_report = (req, res, next)=>{
    if(req.query.report_id) next();
    else res.send({res:50})
}


const get_report = async ()=>{
    try {
        let result = await report_get_db();
        let reports = [];
        result.forEach((obj)=>{
            reports.push(obj)
        })
        return {res: 1, reports: reports};
    }catch (err){
        return {res:69};
    }
}

const report_get_service = async (req, res)=>{
    let result = await get_report();
    res.send(result)
}

const insert_data_report = async (data)=>{
    try {
        await report_post_db(data);
        return 1;
    }catch (err){
        console.log(err);
        return 69;
    }
}

const is_valid_post_report = (req, res, next)=>{
    if(req.body.desc && req.body.level && req.body.location_lat && req.body.location_long && req.body.tag_id ){
        next();
    }
    else{
        res.send({res:50});
    }
}

const post_image = async (req, res)=>{
    console.log(JSON.stringify(req.body));
    let picture = req.file;
    await post_image_db(picture.filename, req.body.report_id, req.session.mail);
    res.send({res:1})
}


export {report_service, is_valid_post_report, report_get_service, post_validate_report, is_valid_post_validate_report, post_image};