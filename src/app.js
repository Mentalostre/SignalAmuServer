import {express_config} from './config/express/express-config.js'
import {express_router} from "./config/express/router-config.js";
import {api_endpoint} from "./router/default.js";
import {set_up_events} from "./config/events/event-config.js";



const PORT = process.env.PORT || 3000;
const app = express_config();
const router = express_router();

set_up_events();

api_endpoint(router); // setup end-point
app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})


