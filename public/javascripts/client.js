var socket = io.connect();
var name = prompt("What is your name?");
var room = 'Instant Barbarians';
    
$(document).ready(function() {
    
    socket.emit("join", name);
    
    $("form").submit(function(){
        //this creates the chat message event with the value of #m as the data
        socket.emit('chat message', $('#m').val());
        //this resets value of the chat message input to empty
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg){
        $("#messages").append($('<li>').text(msg));
    });
    
    socket.on('update', function(msg) {
        $("#messages").append($('<li>').text(msg));
    })



    socket.on('disconnect', function() {
        $("#messages").append($('<li>').text(name + " has disconnected!"));
    });
    
});
