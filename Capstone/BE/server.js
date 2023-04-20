const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const { Server } = require("socket.io");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mysql Nodejs Connection application." });
});

require("./routes/plants.routes.js")(app);
require("./routes/users.routes.js")(app);

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
io.emit('connection', 'a user connected');
});

server.listen(3000, () => {
console.log('listening on *:3000');
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});