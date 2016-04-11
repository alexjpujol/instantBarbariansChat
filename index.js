'use strict';

//loading the modules and creating the server

var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(3000));

//set the static files and the view engine

app.use(express.static('public'))
app.set('view engine', 'jade');
app.set('views', './views');
app.set('view options', {
    layout: false
});

//set up the routes

app.get('/', function(req,res) {
    res.render('index');
})

app.get('/chat', function(req, res) {
    res.render('chat');
});

//set up the message events and emissions


io.on('connection', function(socket) {

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

// io.emit('connection', "A new user has joined.");
