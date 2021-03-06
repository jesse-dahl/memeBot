const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/memeBot', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  image: { type: String, required: true }
});

const Post = new mongoose.model("Meme", postSchema);

module.exports = Post;