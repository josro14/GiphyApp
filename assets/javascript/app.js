
// Initial array of emotions
var gifArr = ["happy", "sad", "disappointed", "excited", "scared"];

function displayGif() {

    var theGIF = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + theGIF + "&api_key=NTnDts5lUIHqZv3x6i94TkFIzfWczNEz&limit=9";
    // Call the Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div id='theGIF'>");
            var rating = results[i].rating;
            //store rating in a div
            var rateDisp = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url); // still image stored into src of image
            gifImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
            gifImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            //adds rating and GIF to the gifDiv
            gifDiv.append(rateDisp, gifImage);
            $("#gif-spot").prepend(gifDiv);

            //once still GIF is generated on the page, user can click it to change the data state and thus animate the GIF
            $("#theGIF").on("click", ".image", function () {
                var state = $(this).attr("data-state");
                console.log(state);
                console.log(this);
                if (state == "still") {
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
//clears input upon entry
function clearInput() {
    $("#gif-input").val("");
}

//function to generate new dynamic buttons on the page as a user enters them in
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
    clearInput();
});

// This is supposed to clear out the GIFs that are currently displayed once a new gif button is clicked
/*function clearGifs() {
    $("#gif-spot").empty();
}*/

$(document).on("click", ".gif-btn", displayGif, /*clearGifs*/);

renderButtons();