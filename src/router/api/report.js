import bodyParser from "body-parser";
import {is_registered} from "../../services/isRegistered.js";
import {report_service, is_valid_post_report, report_get_service} from "../../services/report.js";

export const report = (router)=>{
    router.post('/api/report', bodyParser.urlencoded({extended: true}), is_registered, is_valid_post_report ,report_service);

    router.get('/api/report', is_registered, report_get_service); // return all reports

}