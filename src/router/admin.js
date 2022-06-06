import bodyParser from "body-parser";
import {
    post_admin_connection_service,
    get_admin_connection_service,
    get_user_services
} from "../services/admin/admin.js";

export const admin = (router)=>{
    router.post('/admin/connection', bodyParser.urlencoded({extended:true}), post_admin_connection_service )

    router.get('/admin/connection', get_admin_connection_service)

    router.get('/admin/user', get_user_services)
}