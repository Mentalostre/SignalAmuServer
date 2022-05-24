import {welcome_Api} from "./welcome-api.js";
import {connection} from "./connection.js";
import {report} from "./report.js";
import {tag} from "./tag.js";
import {vote} from "./vote.js";
import {info} from "./info.js";

export default (router)=>{
    welcome_Api(router);
    connection(router);
    report(router);
    tag(router);
    vote(router);
    info(router)
};