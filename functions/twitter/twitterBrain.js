let config = require('./config');
let Twit = require("twit");
let fs = require('fs');

let T = new Twit(config);
let uwuPic = fs.readFileSync('./images/maganime.png', { encoding: 'base64' })

T.post('media/upload', { media_data: uwuPic }, function (err, data, response) {

  let mediaIdStr = data.media_id_string;
  let altText = ":3";
  let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

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