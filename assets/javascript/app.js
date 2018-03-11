
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

function renderButtons() {
    $("#btn-spot").empty();
    for (var i = 0; i < gifArr.length; i++) {
        var b = $("<button>");
        b.addClass("gif-btn");
        b.attr("data-name", gifArr[i]);
        b.text(gifArr[i]);
        $("#btn-spot").append(b);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var theGIF = $("#gif-input").val().trim();
    gifArr.push(theGIF);
    renderButtons();
});

$(document).on("click", ".gif-btn", displayGif);

renderButtons();