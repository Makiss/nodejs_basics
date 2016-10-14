var https = require("https");
var http = require("http");

function printMessage(userName, badgeCount, points) {
  var message = userName + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript";
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function get(userName) {
  var request = https.get("https://teamtreehouse.com/" + userName + ".json", function(response) {
    var body = "";

    response.on("data", function(chunk) {
      body += chunk;
    });

    response.on("end", function() {
      if(response.statusCode === 200) {
        try{
          var profile = JSON.parse(body);
          printMessage(userName, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          // Parse Error
          printError(error);
        }
      } else {
        // Status Code Error
        printError({message: "There was an error getting the profile for " + userName + ". (" +
          http.STATUS_CODES[response.statusCode] +")"});
      }
    });
  });

  // Connection Error
  request.on("error", printError);
}

module.exports.get = get;
