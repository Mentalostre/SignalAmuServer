import {welcome_api_service} from "../../services/welcome-api.js";

export const welcome_Api = (router)=>{
    router.get('/api', welcome_api_service)
}