import {send_mail} from "../../utils/mailer.js";

const mailer = (data)=>{
    const mail = data.mail;
    const last_name = data.last_name;
    const key = data.key;
    send_mail(data).catch((err)=>{
        console.log(err);
    });

};



export {mailer};