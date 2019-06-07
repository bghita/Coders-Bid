// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var firebaseConfig = {
  apiKey: "AIzaSyDO_jSTDFHwO_IQn9jboY6sZwDYCEFjeig",
  authDomain: "mannys-coders-bae.firebaseapp.com",
  databaseURL: "https://mannys-coders-bae.firebaseio.com",
  projectId: "mannys-coders-bae",
  storageBucket: "mannys-coders-bae.appspot.com",
  messagingSenderId: "782797518976",
  appId: "1:782797518976:web:6606275d50170159"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();

// Assign the reference to the database to a variable named 'database'
// var database = ...


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var currentHighestPrice = initialBid;
var currentHighestBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    currentHighestPrice = snapshot.val().highPrice;


    currentHighestBidder = snapshot.val().highBidder;


    // Change the HTML to reflect the stored values
    $('#highest-bidder').text(currentHighestBidder);
    $('#highest-price').text(currentHighestPrice);


    // Print the data to the console.
    console.log("High price is", currentHighestPrice);
    console.log("Highest is", currentHighestBidder);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values

    $('#highest-bidder').text(initialBid);
    $('#highest-price').text(initialBidder);
    // Print the data to the console.
    console.log("High price is", initialBid);
    console.log("Highest is", initialBidder);


  }


  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  const highPrice = parseInt($('#bidder-price').val());
  const highBidder = $('#bidder-name').val();
  console.log()

  // Log the Bidder and Price (Even if not the highest)
  if (highPrice > currentHighestPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highBidder,
      highPrice
    });


    // Log the new High Price
    console.log(highPrice);


    // Store the new high price and bidder name as a local variable
    currentHighestBidder = highBidder;
    currentHighestPrice = highPrice;

    // Change the HTML to reflect the new high price and bidder

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});