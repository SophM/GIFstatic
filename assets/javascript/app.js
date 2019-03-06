// ==================================
// Variables
// ==================================

// array to store the few first cities/monuments and to add the user input
var topics = ["London", "Eiffel Tower", "Las Vegas", "Taj Mahal"];


// ==================================
// Functions
// ==================================

// function to add the user input to the array
function addInput() {
    // store the input written in the textbox into a new variable
    // the trim is to removed everything after the last letter, lingering spaces, punctuation signs, etc...
    var userInput = $("#user-input").val().trim();
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
        // add a class of "topic-button" to the button so we can refer to it for on.click event and styling
        btn.addClass("topic-button btn mr-2 ml-2 text-white bg-info");
        // add a data attribute called "data-name" and give it the value of the element in the array
        btn.attr("data-input", topics[i]);
        // label the button with the value of the element in the array
        btn.text(topics[i]);
        // Added the button to the buttons-view div
        $("#keyword-buttons").append(btn);
    }
}

// function to do the ajax request to the GIPHY API
function ajaxRequest(searchKeyword) {
    // store the url to call the GIPHY API
    // use a keyword for the search called "searchKeyword" and limit the number of results to 10
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchKeyword + "api_key=dc6zaTOxFJmzC&limit=10";
    
    // ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    // when the data are back, the function will run    
    }).then(function(response) {
        // store the data that we got back in a variable called "results"
        var results = response.data;

        // everyone of the ten GIFs
        for (var i = 0; i < results.length; i++) {
            // create a div for the GIF + its rating
            var gifDiv = $("<div>");
            // create a <p> element to display the rating of the GIF
            var p = $("<p>").text("Rating: " + results[i].rating);
            // create an <img> element
            var gifImage = $("<img>");
            // give a source attribute to the <img> element equal to the static GIF url
            gifImage.attr("src", );
            // give a data attribute to the GIF called "data-state" whose value is "static"
            gifImage.attr("data-state", "static");
            // give a data attribute to the GIF called "data-still" whose value is the url towards the static GIF
            gifImage.attr("data-still", );
            // give a data attribute to the GIF called "data-still" whose value is the url towards the static GIF
            gifImage.attr("data-animate",);
            // prepend the rating and the GIF to the div called "gifDiv"
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);
            // prepend the gifDiv to the gif-display - so they finally appear on the page!
            $("#gifs-display").prepend(gifDiv);
        }
    });

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
    // get the value of the button that has been clicked to use it
    // as the searchKeyword in the ajaxRequest() function
    var search = $(this).attr("data-input");
    // make the ajax request, store the rating and the GIFs in new HTML element
    // and prepend them to the existing HTML element with id "gifs-diplay" to display them
    ajaxRequest(search);
});

// "on click" event listener on the GIFs to animate them or make them static
$(".gifs").on("click", function () { 
    // store the state of the GIF, the url to the animated version and the url to the static version of the GIF
    var state = $(this).attr("data-state");
    var animated_image = $(this).attr("data-animate");
    var still_image = $(this).attr("data-still");

    // if the GIF static
    if(state  === "still") {
        // change its source attribute and give it the url to the animated version
        $(this).attr("src", animated_image);
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", still_image);
        $(this).attr("data-state", "still");
      }

});







