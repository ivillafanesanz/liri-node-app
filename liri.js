require('dotenv').config();

var spotify = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// // console.log(spotify)
var axios = require("axios");




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
            for(var i=0; i<response.data.length; i++){
            // console.log(response.data[i].venue);
            console.log("venue location is "+response.data[i].venue.country);
            console.log("name of the venue is "+response.data[i].venue.name);
            console.log("the date is "+response.data[i].datetime);
        }}
    );

}




function spotifySong(inputs) {
    console.log("i am inside spotify function");
//   spotifyKeys
	// var spotify = new Spotify(keys.spotify);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
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
// SPOTIFY_ID=fea1c09c46484ac8813eeb7d4725df21
// SPOTIFY_SECRET=bea9879196554eb5b2c1486af26aff91
// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: "fea1c09c46484ac8813eeb7d4725df21",
//     secret: "bea9879196554eb5b2c1486af26aff91",
// });



// function spotifysong(){
//     if (inputs === ""){
//         inputs = "The Sign";
//         console.log(inputs)
//     }

//     spotify.search({ 
//         type: 'track', 
//         query: inputs,
//         limit: 1
//     }).then(function(response) {
//         var artist = response.tracks.items[0].artists[0].name;
//         var song = response.tracks.items[0].name;
//         var preViewLink = response.tracks.items[0].external_urls.spotify;
//         var album = response.tracks.items[0].album.name;
//         console.log("\n------------\n" +
//                     "\nArtist: " + artist +
//                     "\nSong Title: " + song +
//                     "\nPreview Song: " + preViewLink +
//                     "\nAlbum Name: " + album +
//                     "\n------------\n")
//         logInfo();   
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// }






// function spotifysong(inputs) {
//     spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }

//         console.log(data);
//     });






//     // spotify.search({ type: 'track', query: "all the small things" }, function (err, data) {

//     //     if (err) {
//     //         return console.log('Error occurred: ' + err);
//     //     } else {
//     //         console.log("##############################");
//     //         console.log("Artists: " + data.tracks.items[0].artists[0].name); //artists
//     //         console.log("The Song's Name: " + data.tracks.items[0].name); //song name
//     //         console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify); //preview url
//     //         console.log("Album: " + data.tracks.items[0].album.name); //album
//     //         console.log("###############################");
//     //     };

//     //     console.log(data.tracks);

//     // })
// };





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


