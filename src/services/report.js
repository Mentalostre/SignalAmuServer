import {report_post_db} from "../models/report.js";

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
    res.send({
        res:result
    })
};

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

export {report_service, is_valid_post_report};