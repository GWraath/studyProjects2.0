const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
// const { Server } = require("socket.io");


const app = express();

// var corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the origin of your React app
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mysql Nodejs Connection application." });
});

require("./routes/plants.routes.js")(app);
require("./routes/users.routes.js")(app);

const server = http.createServer(app);
// const io = new Server(server);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your React app's domain
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('connection', 'a user connected');
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
});

  app.listen(5173, () => {
    console.log('listening on port 5173');
  });

  // set port, listen for requests
  const PORT = process.env.NODE_DOCKER_PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });