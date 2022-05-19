import { Server } from "socket.io";
import * as http from "http";

let io;

export const io_config = (app)=>{
    const http_server = http.createServer(app);
    io = new Server(http_server);
    http_server.listen(process.env.IO_PORT || 3001);
}

export const emit_new_report = ()=>{
    io.emit('report');
}