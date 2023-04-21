const express = require('express');
const cors = require("cors");
const { Server } = require("socket.io");
const http = require('http');
const app = express();

var corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server);

const PORT = 3100

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        io.emit("message", message);
    });
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});