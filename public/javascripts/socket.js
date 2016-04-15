var socket = io.connect();

//$("input").keypress(function() {
//    socket.emit('barbarian typing');
//    
//    
//})

$("form").submit(function(){
    //this sends the chat message to the server
    socket.emit('chat message', $('#m').val());
    //this resets value of the chat message input to empty
    $('#m').val('');
    return false;
});

//socket.on('barbarian typing', function() {
//    $("#messages").append($('<li>').text("Barbarian Typing");
//})

socket.on('chat message', function(msg){
    $("#messages").append($('<li>').text(msg));
});