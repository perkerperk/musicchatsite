//express initializes the app to be a function that you can supply to an HTTP server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//define route handler as / and send the html file to site
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//initalizing io connection in the server
io.on('connection', (socket) => {
    //logs connection activity
    console.log('a user connected:', socket.id);
    socket.broadcast.emit(socket.id, 'joined.');

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        socket.broadcast.emit(socket.id, 'left.');
    });
    //logs user inputs that were saved as 'chat message' in the client here in the server
    //emit or send those 'chat messages' back to the client
    socket.on('chat message', (msg) => {
        console.log(socket.id, ': ' + msg);
        io.emit('chat message', msg);

        });

    });
    //listen at port 3000
    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
