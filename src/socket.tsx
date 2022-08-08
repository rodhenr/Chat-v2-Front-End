import { io } from "socket.io-client";

const URL = "https://backend-chat-v2.herokuapp.com/";
const socket = io(URL, { autoConnect: false });

export default socket;
