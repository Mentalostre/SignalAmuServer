const signup_service= (req, res)=>{

    let mail = req.body.mail




    res.send("salut");
};
// mail
// mot de passe

/////////////////////////////////////
////////////email validator /////////

const amu_email_regex = '[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z]+\.univ-amu\.fr';

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