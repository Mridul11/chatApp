var express = require('express');
var socket = require('socket.io');

//app setup
var app = express();

var server = app.listen(3000, function(){

    console.log("Listening to port 3000!");
});

//static filter
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log("Made socket connection!", socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
});
