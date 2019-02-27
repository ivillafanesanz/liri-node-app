


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

module.exports = spotify;



// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };

