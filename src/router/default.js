import {default as api} from './api/api.js'
import {error404_service} from "../services/error404.js";

export const api_endpoint = (rooter)=>{
    rooter.get('/', error404_service);

    api(rooter)

}

