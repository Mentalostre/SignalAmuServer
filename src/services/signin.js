import {hash} from "../utils/sha256-hasher.js";

const signin_service = (req, res)=>{
    let mail = req.body.email;
    let password = req.body.password;
    let encrypted_password = hash(password);
}

export {signin_service}