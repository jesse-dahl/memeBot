const express = require('express');
const ejs = require("ejs");
const parser = require("body-parser");
const multer = require("multer");
const path = require('path');
const Post = require('./models/db');
const Storage = require('./functions/multerStorage');

const imgArr = [];

// Express stuff
const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    }
    res.render("home", {
      msg: "Herro :3",
      files: posts
    });
  });
});

app.get("/upload", function (req, res) {
  res.render("post");
});

app.post("/upload", function (req, res) {

  Storage(req, res, function (err) {
    if (err) {
      res.render('post', {
        msg: "oops there was a wittle fucky wucky :3 : " + err
      });
    } else {
      if (req.file == undefined) {
        res.render('post', {
          msg: "Error: No file was selected!"
        });
      } else {
        const filePath = "uploads/" + req.file.filename;
        const post = new Post({
          image: filePath
        });
        post.save(function (err) {
          if (!err) {
            res.redirect("/");
          } else {
            console.log("There was an error with writing to the database: " + err);
          }
        });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000 UwU");
});