let config = require('./config');
let imageUwu = require('./twitterBrain');
let Twit = require("twit");

let T = new Twit(config);

let tweet = {
  status: "First tweet made by UwUMemeKun-Bot"
}

T.post('statuses/update', tweet, function (err, data, response) {
  if (err) {
    console.log("uwu you made a fucky: " + err);
  } else {
    console.log(data);
  }
});