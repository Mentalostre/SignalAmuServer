import {validate_email_db, update_user_status_db} from "../models/validate-email.js";

const html_page =  null ;

const email_validator_service = (req, res)=>{
    const user = req.params.user;
    const verificaton_code = req.params.vc;
    validate_email_db(verificaton_code).then(async (result)=>{
        if(!result[0]){
            res.send('impossible de verifier l\'email').end();
        }else {
            let last_name = result[0].last_name;
            if (user !== last_name) res.send('impossible de verifier l\'email').end();
            else {
                await update_user_status_db(verificaton_code);
                res.status(200).send('email vérifié').end();
            }
        }
    }).catch((err)=>{
        console.log(err);
    });
};

export {email_validator_service};