import {
    report_post_db,
    report_get_db,
    report_validate_post,
    post_image_db,
    get_image_name_db
} from "../models/report.js";
import fs from 'fs';
import {emit_new_report} from "../config/socket/socket-config.js";

const report_service = async (req, res)=>{
    let data = {
        desc: req.body.desc,
        level: req.body.level,
        location_lat: req.body.location_lat,
        location_long: req.body.location_long,
        tag_name: req.body.tag_name,
        mail: req.session.mail
    };
    let result = await insert_data_report(data);
    if(result.res === 1){
        emit_new_report();
    }
    res.send(result)
};

const post_validate_report = async (req, res)=>{
    let mail = req.session.mail;
    await report_validate_post(req.body.report_id, mail);
    res.send({res:1});
}

const is_valid_post_validate_report = (req, res, next)=>{
    if(req.body.report_id) next();
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
        console.log(err)
        return {res:69};
    }
}

const report_get_service = async (req, res)=>{
    let result = await get_report();
    res.send(result)
}

const insert_data_report = async (data)=>{
    try {
        let lastId = await report_post_db(data);
        return {res:1, lastId:Number(lastId)};
    }catch (err){
        console.log(err);
        return {res:69};
    }
}

const is_valid_post_report = (req, res, next)=>{
    if(req.body.desc && req.body.level && req.body.location_lat && req.body.location_long && req.body.tag_name ){
        next();
    }
    else{
        res.send({res:50});
    }
}

const post_image = async (req, res)=>{
    let picture = req.file;
    try{

        await post_image_db(picture.filename, req.params.id, req.session.mail);
        res.send({res:1})

    }
    catch (e) {
        console.log(e)
        res.send({res:69})
    }
}

const is_valid_post_image = (req, res, next)=>{
    if(req.params.id) next();
    else res.send({res:50});
}

const get_report_image_service = async (req, res)=>{
    let report_id = req.params.reportid;
    let image_names = await get_images_names(report_id);
    res.send({res:1, images_name:image_names });
}

const get_images_names = async(report_id)=>{
    let names = await get_image_name_db(report_id);
    let names_array = [];
    names.forEach((key)=>{
        names_array.push(key.image_name)
    })
    return names_array;
}

export {
    report_service,
    is_valid_post_report,
    report_get_service,
    post_validate_report,
    is_valid_post_validate_report,
    post_image,
    is_valid_post_image,
    get_report_image_service
};