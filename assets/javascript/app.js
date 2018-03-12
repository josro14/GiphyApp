
// Initial array of emotions
var gifArr = ["happy", "sad", "disappointed", "excited"];

function displayGif() {

    var theGIF = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + theGIF + "&api_key=NTnDts5lUIHqZv3x6i94TkFIzfWczNEz&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div id='theGIF' data-state='animated' data-url-still='results[i].images.fixed_height_still.url' data-url-animated='results[i].images.fixed_height.url'>");
            var rating = results[i].rating;
            var rateDisp = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            //gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            //gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifDiv.append(rateDisp, gifImage);
            $("#gif-spot").prepend(gifDiv);

            $("#theGIF").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
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
   // $("#gif-input").val(""); this is supposed to clear the value in the input box, but it clears the button value as well...
    event.preventDefault();
    var theGIF = $("#gif-input").val().trim();
    gifArr.push(theGIF);
    renderButtons();
});

$(document).on("click", ".gif-btn", displayGif);

renderButtons();