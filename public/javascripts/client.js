var socket = io.connect();
var name = prompt("What is your name?");
var room = 'Instant Barbarians';
    
$(document).ready(function() {
    
    //adding users to the active user list
    socket.on('connect', function() {
         $("#userlist").append($('<li>').text(name))
    })
    
    //send the name from the prompt to the server
    socket.emit('join', name);
    
    socket.emit('typing', name);
    
     //append to the chat log the name of the user that joined
    socket.on('new user', function(user) {
        $("#messages").append($('<li>').text(user));
    });
    
    socket.on('typing', function(data) {
        $("#messages").append($('<li>').text(data));
    })
    
    
    // GOOGLE translate functions here
    $("#translate").click(function(evt) {
        evt.preventDefault();
        $("#popup").css({"display": "block"});
        $(".language").click(function(e) {
            if(e.currentTarget.innerHTML === "German") {
                var target = "de"
            } else if (e.currentTarget.innerHTML === "Spanish") {
                var target = "es"
            } else if (e.currentTarget.innerHTML === "French") {
                var target = "fr"
            }
            else if (e.currentTarget.innerHTML === "Chinese") {
                var target = "zh-CN"
            }
            else if (e.currentTarget.innerHTML === "Japanese") {
                var target = "ja"
            }
            else if (e.currentTarget.innerHTML === "Catalan") {
                var target = "ca"
            };
            var startingText = $('#m').val();
            var source = `https://www.googleapis.com/language/translate/v2?key=AIzaSyDY4WYub-4sTOjexMqIrBozgbTpUURtK7k&source=en&target=${target}&q=${startingText}`;
            function translateText(text) {
                var translatedText = (text.data.translations[0].translatedText).replace("&#39;", "'");
                console.log(translatedText);
                $('#m').val('');
                $('#m').val(translatedText + " (" + startingText + ")");
            }
            $.getJSON(source, translateText);
        });
    })
    
    //this is for submitting a chat message
    $("form").submit(function(){
        //this creates the chat message event with the value of #m as the data
        socket.emit('chat message', $('#m').val());
        //this resets value of the chat message input to empty
        $('#m').val('');
        return false;
    });
    
    //append to the chat log a user's chats
    socket.on('chat message', function(msg){
        $("#messages").append($('<li>').text(msg));
    });
    
    $("#chatmessages").scrollTop(100);
    
    // send to the server the name of the user that left the chat
    socket.emit('disconnect', name);
    // add to the chat log the name of the user that left
    socket.on('disconnect', function(user) {
        $("#messages").append($('<li>').text(user));
    });
});
    

