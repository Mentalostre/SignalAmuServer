import events from 'events'
import {mailer} from "../../services/events/signup-event-mailer.js";

const eventEmitter = new events.EventEmitter();

const set_up_events = ()=>{
    eventEmitter.on('signup', mailer)
}

export{set_up_events, eventEmitter};