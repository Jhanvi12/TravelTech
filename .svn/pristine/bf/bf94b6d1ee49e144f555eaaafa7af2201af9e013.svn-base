'use strict';
var model = require('../../model');
var Notification = model.Notifications; // require Notification model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var notificationService = require('./service');
var userService = require('../users/service');
module.exports = function(req, res) {
    //validation for Notification exists
    if (!validator.isLength(req.body.receiver, 1))
    {
        return response(res, null, "invalid receiver", 422);
    }
    //validation for description exists
    if (!validator.isLength(req.body.description, 1))
    {
        return response(res, null, "invalid description", 422);
    }

    userService.getUserById(req.body.receiver).then(function(data){
    console.log(data.name);
   
    req.body.receiver_name = data.name;
    var jsonData = req.body;
    console.log("req.body",req.body);
    // create new Notification
    notificationService.createNotification(req.body).then(function(data) {
        if (!data) {
            return response(res, null, "Failed", 500);
        }
        // created!
        return  response(res, data, "notification created", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
     })
};