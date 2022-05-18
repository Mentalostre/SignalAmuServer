import bodyParser from "body-parser";
import {is_registered} from "../../services/isRegistered.js";
import {report_service} from "../../services/report.js";

export const report = (router)=>{
    router.post('/api/report', bodyParser.urlencoded({extended: true}), is_registered, report_service)
}