import {hash} from "../utils/sha256-hasher.js";


const signup_service= (req, res)=>{



    let mail = req.body.email;
    let password = req.body.password;
    let encrypted_password = encrypt_password(password);
    let names = get_names(mail);
    let data = {
        mail: mail,
        password: encrypted_password,
        first_name: names.firstName,
        last_name: names.lastName
    }


    res.send("salut");
};
// mail
// mot de passe


const signup_db = async (data)=>{

}


const get_names = (mail) =>{
    let arr1 = mail.split("@");
    let arr2 = arr[0];
    let names = first.split(".");
    let f = nameettout[0];
    let l = nameettout[1];
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
        res.statusMessage = "Invalid email";
        res.status(406).end();
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
        res.status(406).end();
    }
};







export {
    signup_service,
    is_valid_req_signup_service,
    is_amu_email
};