// ==================================
// Variables
// ==================================

// array to store the few first cities/monuments and to add the user input
var topics = ["Paris", "Las Vegas", "Taj Mahal", "Rome", "Time Square", "San Francisco"];


// ==================================
// Functions
// ==================================

// function to add the user input to the array
function addInput() {
    // store the input written in the textbox into a new variable
    // the trim is to removed everything after the last letter, lingering spaces, punctuation signs, etc...
    var userInput = $("#user-input").val().trim();
    // empty the text area
    $("#user-input").val("");
    // add the user input from the textbox to the array "topics"
    topics.push(userInput);
}

// function to create the buttons corresponding to the elements of the array
function createButton() {
    // empty the div of buttons to avoid having repeated buttons
    $("#keyword-buttons").empty();

    // Loops through the "topics" array
    for (var i = 0; i < topics.length; i++) {

        // create the button 
        var btn = $("<button>");
        // add a class of "topic-button" to the button and Bootstrap's classes for styling
        btn.addClass("topic-button btn m-2 text-white bg-info");
        // add a data attribute called "data-name" and give it the value of the element in the array
        btn.attr("data-input", topics[i]);
        // label the button with the value of the element in the array
        btn.text(topics[i]);
        // Added the button to the buttons-view div
        $("#keyword-buttons").append(btn);
    }
}


// ==================================
// Main process
// ==================================

// display the buttons for the elements already present in the array
createButton();

// "on click" event listener on the "Add it" button to add the user input into the array,
// create a button for it and display this newly created button on the page
$("#add-keyword").on("click", function(event) {
    // prevent the default behavior of a submit button, which is to refresh the page when clicked
    event.preventDefault();
    // add the user input into the "topics" array
    addInput();
    // create the button corresponding to the userInput
    createButton();
});

// "on click" event listeners to every HTML elements with the "topic-button" class.
// when they are clicked....
$(document).on("click", ".topic-button", function () {
    // empty the "gifs-display" div
    $("#gifs-display").empty(); 
    // get the value of the button that has been clicked to use it
    var search = $(this).attr("data-input");
    // store the url to call the GIPHY API
    // use the value of the button clicked for the search and limit the number of results to 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=DEXqPPOyoHEcrjohpDGVV2qJRMGZ8X1E&limit=10";

    // make the ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    // when the data are back, the function will run    
    }).then(function(response) {
        console.log(response);
        // store the data that we got back in a variable called "results"
        var results = response.data;
        console.log(results);

        // for everyone of the ten GIFs
        for (var i = 0; i < results.length; i++) {

            // Only do the work if the gif has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // create a div for the GIF + its rating
                var gifDiv = $("<div>");
                // give a class to the <div> element called "gif-div" and Bootstrap's classes for styling
                gifDiv.addClass("gif-div mb-3");
                // create a <p> element to display the rating of the GIF
                var p = $("<p>").text("Rating: " + results[i].rating);
                // give Bootstrap's classes to the <p> element for styling
                p.addClass("ml-3 mb-1 text-white");
                // create an <img> element
                var gifImage = $("<img>");
                // give a source attribute to the <img> element equal to the static GIF url
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                // give a class to the <img> element called "gif" and Bootstrap's classes for styling
                gifImage.addClass("gif m-2 img-thumbnail");
                // give a data attribute to the GIF called "data-state" whose value is "static"
                gifImage.attr("data-state", "static");
                // give a data attribute to the GIF called "data-still" whose value is the url towards the static GIF
                gifImage.attr("data-static", results[i].images.fixed_height_still.url);
                // give a data attribute to the GIF called "data-still" whose value is the url towards the animated GIF
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                // append the rating and the GIF to the div called "gifDiv"
                gifDiv.append(p, gifImage);
                // append the gifDiv to the "gif-display" div - so they finally appear on the page!
                $("#gifs-display").append(gifDiv);
            }
        }
    });
});


// "on click" event listeners to every HTML elements with the "gif" class.
// when they are clicked....
$(document).on("click", ".gif", function () { 
    // store the state of the GIF, the url to the animated version and the url to the static version of the GIF
    var state = $(this).attr("data-state");
    var animated_image = $(this).attr("data-animate");
    var static_image = $(this).attr("data-static");

    // if the GIF is static
    if(state  === "static") {
        // change its source attribute and give it the url of the animated version
        $(this).attr("src", animated_image);
        //change its state to animate
        $(this).attr("data-state", "animate");
    // if the GIF isn't static, so if it is animated
    } else {
        // change its source attribute and give it the url of the static version
        $(this).attr("src", static_image);
        //change its state to static
        $(this).attr("data-state", "static");
    }

});







