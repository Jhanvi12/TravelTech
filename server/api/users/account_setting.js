'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var userService = require('./service');

module.exports = function(req, res){

    //validation for firstname exists
    if(!validator.isLength(req.body.message, 1))
    {
        return response(res, null, "invalid message", 422);
    }

    // fetching user by its email
    userService.getUserById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "No record found", 204);
      }
        var result = userDto.marshal(data);
        var sendEmail = mail.changeAccountSetting(data.email, req.body.message);
        if(sendEmail){
          return response(res, data, "Message sent", 200);
        }

        return  response(res, result,  "User records fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
