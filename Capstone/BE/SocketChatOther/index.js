const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT = 3100

const onlineUsers = new Map()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.json())

io.on('connection', (socket) => {
    console.log(socket.id + ' connected')

    onlineUsers.set(socket.id, 'Anonymous')
    console.log(onlineUsers)

    socket.emit('connection')

    io.emit('user connected', Array.from(onlineUsers))

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')
        const disconnectedUsername = onlineUsers.get(socket.id)
        onlineUsers.delete(socket.id)
        console.log(onlineUsers)
        socket.broadcast.emit('user disconnect', { onlineUsers: Array.from(onlineUsers), username: disconnectedUsername })
    })

    socket.on('chat message', (msgData) => {
        console.log('message: ', msgData)

        if (onlineUsers.get(socket.id) != msgData.username) {
            onlineUsers.set(socket.id, msgData.username)
            io.emit('username changed', Array.from(onlineUsers))
        }

        socket.broadcast.emit('chat message', msgData)
    })

});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});