import {welcome_Api} from "./welcome-api.js";
import {connection} from "./connection.js";

export default (router)=>{
    welcome_Api(router);
    connection(router);
};