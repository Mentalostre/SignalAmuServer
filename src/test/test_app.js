import {io} from "socket.io-client"

console.log("allo")

const socket = io("http://localhost");


socket.on("allo", () => {
    // revert to classic upgrade
    console.log("maimouna")
});