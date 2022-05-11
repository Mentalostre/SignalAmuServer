
const email_validator_service = (req, res)=>{
    const user = req.params.user;
    const verificaton_code = req.params.vc;
    console.log(user)
    console.log(verificaton_code);
    res.status(200).send('gg');
};

export {email_validator_service};