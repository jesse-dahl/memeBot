var config = require('./config');
var Twit = require("twit");
var fs = require('fs');

var T = new Twit(config);
var uwuPic = fs.readFileSync('./images/maganime.png', { encoding: 'base64' })

T.post('media/upload', { media_data: uwuPic }, function (err, data, response) {

  var mediaIdStr = data.media_id_string;
  var altText = ":3";
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (err) {
      console.log("oops you made a fucky wucky: " + err);
    } else {
      var params = { status: 'UwU', media_ids: [mediaIdStr] };

      T.post('statuses/update', params, function (err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  });
});