var socket = io.connect();
var room = 'Instant Barbarians';

function getNameVariable(variable) {
    var query = window.location.search.substring(1).split("=");
    var urlName = query[1];
    if (urlName === undefined) {
        return "Someone"
    } else {
        return(urlName.split("+")[0])
    }
};

var webrtc = new SimpleWebRTC({
  // where the local video lives
  localVideoEl: 'localVideo',
  // where the remote video lives
  remoteVideosEl: 'remotesVideos',
  // immediately ask for camera access
  autoRequestMedia: true
});

webrtc.on('readyToCall', function () {
  // Instant Barbarian room
  webrtc.joinRoom('Instant Barbarians');
});
    
var name = getNameVariable();
$(document).ready(function() {

    //this interval scrolls the chat log to the bottom
    setInterval(function() {
        var messagediv = document.getElementById("messages");
    var scroll = messagediv.scrollHeight;
    messagediv.scrollTop = scroll;
    }, 500);

    
    //adding users to the active user list
    socket.on('connect', function() {
         $("#userlist").append($('<li>').text(name));
    })
    
    
    //send the name from the prompt to the server
    socket.emit('join', name);
    // socket.emit('typing', name);
    
     //append to the chat log the name of the user that joined
    socket.on('new user', function(user) {
        $("#messages").append($('<li>').text(user));
    });

    
    // GOOGLE translate functions here. the api token is exposed but it's limited to only working on URLs that I specify, so it's no biggie
    var startingLanguage;
    $("#translate").click(function(e) {
        e.preventDefault();
        $('#popup').slideToggle("slow");
        var startingText = $('#m').val();
        
        if (startingText != "") {
            var detect = `https://www.googleapis.com/language/translate/v2/detect?key=AIzaSyDY4WYub-4sTOjexMqIrBozgbTpUURtK7k&q=${startingText}`;
        
            function detectText(data) {
            startingLanguage = data.data.detections[0][0].language;
            console.log(startingLanguage);
        }
        
            $.getJSON(detect,detectText);
        };
    });
    
        
    $(".language").click(function(e) {
            console.log(startingLanguage);
            if(e.currentTarget.innerHTML === "German") {
                var target = "de"
            } else if (e.currentTarget.innerHTML === "English") {
                var target = "en"
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
            
            if (startingLanguage != target) {
            var source = `https://www.googleapis.com/language/translate/v2?key=AIzaSyDY4WYub-4sTOjexMqIrBozgbTpUURtK7k&source=${startingLanguage}&target=${target}&q=${startingText}`;
        
            function translateText(text) {
                var translatedText = (text.data.translations[0].translatedText).replace("&#39;", "'");
                console.log(translatedText);
                $('#m').val('');
                $('#m').val(translatedText);
            }
            $.getJSON(source, translateText);
            }
            else {
                return false
            }
            $('#popup').slideToggle("slow");
        });
    
    
    
    
    // this prevents double translation if you press enter
    $(".language").keypress(function(e) {
        if (e.which == 13) {
                return false;
            };
    });
    
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
        var time = new Date();
        var minutes = function() {if (time.getMinutes() < 10) {
            return ("0" + time.getMinutes())
        } else {
            return time.getMinutes();
        }};
        var hours = function() {if (time.getHours() <= 12) {
            return time.getHours();
        } else {
            return time.getHours() - 12;
        }};
        var formattedTime = hours() + ":" + minutes();
        $("#messages").append($('<li>').text(formattedTime + " - " + msg));
    });

    
    // send to the server the name of the user that left the chat
    socket.emit('disconnect', name);
    // add to the chat log the name of the user that left
    socket.on('disconnect', function(user) {
        $("#messages").append($('<li>').text(user));
    });
});
    

