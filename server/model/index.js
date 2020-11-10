var fs = require("fs");
var path = require("path");
var mongoose = require('mongoose');
var config = require('config');
var connect=mongoose.connect(config.db.uri);
var basename = path.basename(module.filename);
var db = {};
//READING ALL THE FILES IN THE MODEL FOLDER
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    db[file.replace(/\.[^/.]+$/, "")] = require(path.join(__dirname, file));
  });

db.Mongoose = mongoose;
db.Connect=connect;

module.exports = db;
