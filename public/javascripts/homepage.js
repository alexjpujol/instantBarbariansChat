$(document).ready(function() {
    
    $("#route").click(function() {
        var route = $("#enterroom").val();
        $("#route").attr("action", "/" + route);
    });

});

