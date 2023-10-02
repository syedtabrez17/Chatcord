const express = require('express');
const http = require("http");
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');
    // io.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    // listen for chatMessage
    socket.on('chatMessage', msg =>{
        // console.log(msg);
        io.emit('message', msg);
    })
});

const port = 3000 || process.env.port;

server.listen(port, () => console.log(`Server running on port ${port}`));