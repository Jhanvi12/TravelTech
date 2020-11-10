'use strict';
var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
// var moment = require('body-parser');
var userService = require('./service');
var fs = require('fs');
var _ = require('lodash');
var passwordHash = require('password-hash');
module.exports = function(req, res){

};

 
module.exports = function(req, res){
    
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  updateQuery.notification_setting = req.body;
  // updateQuery.notification_setting.sms = req.body.sms;
  // updateQuery.notification_setting.push_notification = req.body.push_notification;
  // checking email
  console.log('req.body', req.body);
  console.log('updateQuery', updateQuery);

      // updating new user
      userService.updateUserById(req.params.id, updateQuery).then(function(data){
        if(!data){
          return response(res, null,  "Failed", 500);
        }
        
         return response(res, data,  "user record updated", 200);
    

     }).catch(function(err){  
      return response(res, null,  err.message, 500);
    });
};
