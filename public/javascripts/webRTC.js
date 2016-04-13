$("#record").click(function(){
    
    //this allows cross browser capabilities
    navigator.getUserMedia = (navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
    
    //this specifies what devices we're accessing, camera and mic
    var parameters = {
        video: true,
        audio: true
    }
    
    //what to do when the user allows access to their audio and video
    var successFunction = function(localMediaStream) {
        window.stream = localMediaStream;
        var video = document.getElementById("myvideo");
        video.src = window.URL.createObjectURL(localMediaStream);
    }
    
    //generic error function. will revisit this
    var errorFunction = function(e) {console.log(e)}
    
    navigator.getUserMedia(parameters, successFunction, errorFunction)
});

$("#stop").click(function() {
    stream.getTracks()[0].stop();
    stream.getTracks()[1].stop();
})
