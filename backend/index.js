const express = require('express');
const uuidv4 = require('uuid').v4;
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors');
app.use(cors())
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});