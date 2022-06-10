import bodyParser from "body-parser";
import {
    post_admin_connection_service,
    get_admin_connection_service,
    get_user_services, post_consumer_service, post_consumer_service_remove
} from "../services/admin/admin.js";
import {is_registered_admin} from "../services/isRegistered.js";

export const admin = (router)=>{
    router.post('/admin/connection', bodyParser.urlencoded({extended:true}), post_admin_connection_service )

    router.get('/admin/connection', get_admin_connection_service)

    router.get('/admin/user', get_user_services)

    router.post('/admin/consumer/:id', post_consumer_service)

    router.delete('/admin/consumer/:id', post_consumer_service_remove)

    router.get('/api/isAdmin',is_registered_admin ,(req, res)=>{
        res.send({res:1});
    })

}