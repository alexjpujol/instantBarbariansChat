$("#record").click(function(){
    
    navigator.getUserMedia = (navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
    
    var parameters = {
        video: true,
        audio: true
    }
    
    var errorFunction = function(e) {console.log(e)}
    
    navigator.getUserMedia(parameters, function(localMediaStream) {
        var video = document.getElementById("myvideo");
        video.src = window.URL.createObjectURL(localMediaStream);
    }, errorFunction)
})
