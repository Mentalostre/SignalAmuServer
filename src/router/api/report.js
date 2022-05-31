import bodyParser from "body-parser";
import multer from 'multer';

const upload = multer({dest:'./upload'});

import {is_registered, is_registered_admin} from "../../services/isRegistered.js";
import {
    report_service,
    is_valid_post_report,
    report_get_service,
    post_validate_report,
    is_valid_post_validate_report, post_image, is_valid_post_image, get_report_image_service
} from "../../services/report.js";

export const report = (router)=>{
    router.post('/api/report', bodyParser.urlencoded({extended: true}), is_valid_post_report ,report_service);

    router.get('/api/report', is_registered, report_get_service); // return all reports

    router.post('/api/report/validate', bodyParser.urlencoded({extended: true}),is_registered_admin, is_valid_post_validate_report, post_validate_report);

    router.post('/api/report/image',is_registered, upload.single('picture'), is_valid_post_image , post_image);

    router.get('/api/report/image/:reportid', is_registered, get_report_image_service)

}