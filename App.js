const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("sendMessage", (data)=>{
       socket.broadcast.emit("receiveMessage", data)
    })
})

server.listen(process.env.PORT || 3001, () => {
    console.log('server is Runnig')
})