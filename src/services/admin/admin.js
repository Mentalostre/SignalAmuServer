import path from 'path';
import {fileURLToPath} from 'url';
import {get_user_db} from "../../models/user.js";
import {post_consumer_db, post_consumer_remove_db} from "../../models/admin.js";
import {report_get_all_db, report_get_db} from "../../models/report.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const post_admin_connection_service = (req, res)=>{
    if(req.body.password === (process.env.ADMIN_PASSWORD || 'admin')){
        req.session = {
            admin:true
        };
        res.sendFile(path.join(__dirname + '/Vueadmin.html'));
    }
    else{
        req.session = null;
        res.sendFile(path.join(__dirname + '/loginadmin.html'));
    }
}

const get_admin_connection_service = (req,res)=>{
    res.sendFile(path.join(__dirname + '/loginadmin.html'));
}

const get_user_services = async (req, res)=>{
    let users = await get_user_db();
    res.send({res:1, users:users})
}

const post_consumer_service = async (req, res)=>{
    let userId = req.params.id;
    try {
        let result = await post_consumer_db(userId)
        res.send({res:1, lastId:result});
    }catch (err){
        res.send({res: 69});
    }
}

const post_consumer_service_remove = async (req, res)=>{
    let userId = req.params.id;
    try {
        await post_consumer_remove_db(userId)
        res.send({res:1});
    }catch (err){
        res.send({res: 69});
    }
}

const report_getALL_service = async (req, res)=>{
    try {
        let result = await report_get_all_db();
        let reports = [];
        result.forEach((obj)=>{
            reports.push(obj)
        })
        res.send({res: 1, reports: reports});
    }catch (err){
        console.log(err)
        return {res:69};
    }
}


export {post_admin_connection_service, get_admin_connection_service, get_user_services, post_consumer_service, post_consumer_service_remove, report_getALL_service}
