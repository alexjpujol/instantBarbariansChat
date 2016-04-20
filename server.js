'use strict';

//loading the modules and creating the server

var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.PORT || 3000));

//set the static files and the view engine

app.use(express.static('public'))
app.set('view engine', 'jade');
app.set('views', './views');
app.set('view options', {
    layout: false
});

//set up the routes

app.get('/chat', function(req,res) {
    res.render('chat', {title: "Instant Barbarians"});
});
//set up the message events and emissions


io.on('connection', function(socket) {
    
    var users = {}
    
    socket.on('join', function(name) {
    //i take the socket ID of the socket that just joined and assign that as a key. The value is then the name that is collected via the prompt. This is then passed back to the client
        users[socket.id] = name;
        io.emit('new user', name + " has joined the chat!");
    });
//    socket.on('typing', function(name) {
//        io.socket.broadcast(name + " is typing!");
//    })
    
    socket.on('chat message', function(msg) {
        io.emit('chat message', users[socket.id] + " says: " + msg);
    });
    
    socket.on('disconnect', function() {
        io.emit('disconnect', users[socket.id] + " has left the chat!");
    })
});

// io.emit('connection', "A new user has joined.");
