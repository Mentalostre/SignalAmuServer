import {hash} from "../utils/sha256-hasher.js";
import {signup_db} from "../models/signup.js";
import {eventEmitter} from "../config/events/event-config.js";

const signup_service= async (req, res)=>{
    let mail = req.body.email;
    let password = req.body.password;
    let encrypted_password = encrypt_password(password);
    let names = get_names(mail);
    let key = generate_key();
    let data = {
        mail: mail,
        password: encrypted_password,
        first_name: names.firstName,
        last_name: names.lastName,
        key: key
    }
    try {
        await signup_db(data);
        eventEmitter.emit('signup', {mail:mail, last_name: names.lastName, key:key});
        res.send({res: 1});
    }
    catch (err){
        if(err.errno === 1062){ // ducplicate mail
            res.status(200).send({res: 100});
        }
        else{
            console.log("signup error : " + err);
            res.send({res: 69});
        }
    }
};
// mail
// mot de passe


const generate_key = ()=>{
    return Math.round((Math.random() * 100000) * 72);
}

const get_names = (mail) =>{
    let arr1 = mail.split("@");
    let arr2 = arr1[0];
    let names = arr2.split(".");
    let f = names[0];
    let l = names[1];
    return {
        firstName:f,
        lastName:l
    }

}


const encrypt_password = (password) =>{
    return hash(password);
}


/////////////////////////////////////
////////////email validator /////////

const amu_email_regex = '[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z]+\.univ-amu\.fr';
const amu_etu_email_regex = '[a-zA-Z]+\\.[a-zA-Z]+@etu\\.univ-amu\\.fr';

const is_amu_email = (req, res, next)=>{
    if(validate_amu_email(req.body.email)) next();
    else{
        res.status(200).send({
            res:25
        });
    }
};

const validate_amu_email = (email)=>{
    return email.match(
        amu_email_regex
    )
};

/////////////////////////////////////


const is_valid_req_signup_service = (req, res, next)=>{
    if (req.body.email && req.body.password) next();
    else {
        res.statusMessage = "Invalid request";
        res.status(200).send({
            res:50
        });
    }
};


export {
    signup_service,
    is_valid_req_signup_service,
    is_amu_email
};