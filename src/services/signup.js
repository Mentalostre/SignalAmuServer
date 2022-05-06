const signup_service= (req, res)=>{

    req
    res.send("salut");
};
// mail
// mot de passe

const is_valid_req_signup_service = (req, res, next)=>{
    if (req.body.email && req.body.password) next();
    else {
        res.statusMessage = "Invalid request";
        res.status(406).end();
    }
}





export {
    signup_service,
    is_valid_req_signup_service
};