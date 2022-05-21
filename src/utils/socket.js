import React from "react";
import socketIOClient from "socket.io-client";
let server = 'http://localhost:23000';
// The Header creates links that can be used to navigate
// between routes.

let socket = socketIOClient(server);
 
export { socket };