var config = require('./config');
var imageUwu = require('./twitterBrain');
var Twit = require("twit");

var T = new Twit(config);

var tweet = {
  status: "First tweet made by UwUMemeKun-Bot"
}

// T.post('statuses/update', tweet, function (err, data, response) {
//   if (err) {
//     console.log("uwu you made a fucky: " + err);
//   } else {
//     console.log(data);
//   }
// });