import bodyParser from "body-parser";
import multer from 'multer';

const upload = multer({dest:'./upload'});

import {is_registered, is_registered_admin} from "../../services/isRegistered.js";
import {
    report_service,
    is_valid_post_report,
    report_get_service,
    post_validate_report,
    is_valid_post_validate_report, post_image
} from "../../services/report.js";

export const report = (router)=>{
    router.post('/api/report', bodyParser.urlencoded({extended: true}), is_registered, is_valid_post_report ,report_service);

    router.get('/api/report', is_registered, report_get_service); // return all reports

    router.post('/api/report/validate', bodyParser.urlencoded({extended: true}),is_registered_admin, is_valid_post_validate_report, post_validate_report);

    router.post('/api/report/image', upload.single('picture'), is_registered, post_image);

}