import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const post_admin_connection_service = (req, res)=>{
    if(req.body.password === (process.env.ADMIN_PASSWORD || 'admin')){
        req.session = {
            admin:true
        };
        res.sendFile(path.join(__dirname + '/Vueadmin.html'));
    }
    else{
        req.session = null;
        res.sendFile(path.join(__dirname + '/loginadmin.html'));
    }
}

const get_admin_connection_service = (req,res)=>{
    res.sendFile(path.join(__dirname + '/loginadmin.html'));
}


export {post_admin_connection_service, get_admin_connection_service}
