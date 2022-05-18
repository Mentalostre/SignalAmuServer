export const is_registered = (req, res, next)=>{
    if(req.session.mail) {next();}
    else{
        res.send({res: 22});
    }
}

