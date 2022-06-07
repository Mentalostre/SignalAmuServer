const is_registered = (req, res, next)=>{
    console.log(req.headers)

    if(req.session.mail) {next();}
    else{
        res.send({res: 22});
    }
}

const is_registered_admin = (req, res, next)=>{
    if(req.session.consumer) {next();}
    else{
        res.send({res: 22});
    }
}

export {is_registered, is_registered_admin}

