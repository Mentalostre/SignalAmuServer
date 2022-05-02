import * as services from '../services/default.js'
import {default as api} from './api/api.js'

export const api_endpoint = (rooter)=>{
    rooter.get('/', services.error404);

    api(rooter, services)

}

