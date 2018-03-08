var gifArr = [];

$("button").on("click", function() {

var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=NTnDts5lUIHqZv3x6i94TkFIzfWczNEz";

    $.ajax({url:queryURL, 
        method:"GET"})
        .done(function(response){
            console.log(response);
        });
    });