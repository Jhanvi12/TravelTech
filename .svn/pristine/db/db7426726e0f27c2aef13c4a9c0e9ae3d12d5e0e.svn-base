'use strict';
var model = require('../../model');
var City = model.City; // require City model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var feedbackService = require('./service');
var userService = require('../users/service');
module.exports = function(req, res){
var jsondata = req.body;
jsondata.user_id = req.user.uid;
req.body.userid = jsondata.user_id;

console.log("The id is",req.body.userid);
 userService.getUserById(req.body.userid).then(function(data){
    console.log(data.name);
      req.body.reviewer_name = data.name;
      console.log(req.body);
    feedbackService.createFeedback(req.body).then(function(data){
        if(!data){
            return response(res, null,  "Failed", 500);
        }
        return response(res, data, "Feedback Submitted", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
});
}
