import Server, { io } from "socket.io-client";

export const socket = io("http://localhost:8080/", {
    extraHeaders: {
        token: "bear:::123",
    },
});
