require('dotenv').config();

var spotify = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// // console.log(spotify)
var axios = require("axios");


var moment = require('moment');
moment().format();

var request = require('request');

// var Spotify = require('node-spotify-api');
var fs = require('fs');

var input = process.argv;
var action = input[2];
var inputs = input[3];

switch (action) {
    // case "my-tweets":
    // twitter(inputs);
    // break;

    case "concert-this":
        concertthis(inputs);
        break;

    case "spotify-this-song":
        spotifySong(inputs);
        break;

    case "movie-this":
        movie(inputs);
        break;

    case "do-what-it-says":
        doit();
        break;
};





function concertthis(inputs) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            // Then we print out the imdbRating
            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].venue);
                console.log("venue location is " + response.data[i].venue.country);
                console.log("name of the venue is " + response.data[i].venue.name);
                console.log("the date is " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            }
        }
    );

}




function spotifySong(inputs) {


    if (!inputs) {
        inputs = 'The Sign';
    }
    spotify.search({ type: 'track', query: inputs }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link: " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);
    });
}


function movie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function (error, response, body) {
        if (!inputs) {
            inputs = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

function doit() {
    fs.readFile('random.txt', "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
        if (dataArr[0] === "spotify-this-song") {
            // console.log(dataArr[1])
            var songcheck = dataArr[1].slice(1, -1);
            spotifySong(songcheck);
        }
        else if (dataArr[0] === "concert-this") {
            var concert_name = dataArr[1].slice(1, -1);
            concertthis(concert_name);
        } else if (dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].slice(1, -1);
            movie(movie_name);
        }

    });

};


