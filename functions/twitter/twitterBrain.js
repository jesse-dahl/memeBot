const config = require('./config');
const Twit = require("twit");
const fs = require('fs');
const Post = require('../../models/db');
const T = new Twit(config);


const uwuTweet = function (dirname, filePath) {
  const uwuPic = fs.readFileSync(dirname + "/public/" + filePath, { encoding: 'base64' })

  const newTwit = T.post('media/upload', { media_data: uwuPic }, function (err, data, response) {

    const mediaIdStr = data.media_id_string;
    const altText = ":3";
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

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
}



module.exports = uwuTweet;