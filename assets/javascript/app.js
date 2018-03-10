
// Initial array of emotions
var gifArr = ["happy", "sad", "disappointed", "excited"];

function displayGif() {

    var theGIF = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + theGIF + "&api_key=NTnDts5lUIHqZv3x6i94TkFIzfWczNEz";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            //making div to hold the displayed gif
            var gifDiv = $("<div class='theGIF'>");
            var rating = results[i].rating;
            var rateDisp = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(rateDisp, gifImage);
            $("#gif-spot").prepend(gifDiv);
        }
    });

}