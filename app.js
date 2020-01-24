const express = require('express');
const ejs = require("ejs");
const parser = require("body-parser");
const multer = require("multer");
const path = require('path');
const Post = require('./models/db');
const Storage = require('./functions/multerStorage');
var config = require('./functions/twitter/config');
//var imageUwu = require('./imageBrain');

// Express stuff
const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/upload", function (req, res) {
  res.render("post");
});

app.post("/", function (req, res) {

  Storage(req, res, function (err) {
    if (err) {
      res.render('home', {
        msg: "oops there was a wittle fucky wucky :3 : " + err
      });
    } else {
      if (req.file == undefined) {
        res.render('home', {
          msg: "Error: No file was selected!"
        });
      } else {
        const post = new Post({
          image: req.file.path
        });
        post.save(function (err) {
          if (!err) {
            res.render('home', {
              msg: "File Uploaded!",
              file: `uploads/${req.file.filename}`
            });
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