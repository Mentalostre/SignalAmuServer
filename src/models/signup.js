import {pool} from "../config/database/database-config.js";

const signup_query = "INSERT into user (user_email, password, first_name, last_name) VALUES (?, ?, ?, ?)";

const signup_db = async (data)=>{

}