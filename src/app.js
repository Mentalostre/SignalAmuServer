import {express_config} from './config/express.js'
import {express_router} from "./config/router.js";
import {api_endpoint} from "./router/default.js";


if(process.env.NODE_ENV !== 'production'){
    const dot_env = await import('dotenv');
    dot_env.config();
}

const PORT = process.env.PORT || 3000;
const app = express_config();
const router = express_router();

api_endpoint(router); // setup end-point
app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})


