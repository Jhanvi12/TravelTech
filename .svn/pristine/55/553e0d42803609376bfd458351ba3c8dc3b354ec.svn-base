'use strict';
  var express = require('express');
  var models = require('../../model');
  var User = models.User;
  var response = require('../../components/response.js');
  var verify = require('../../components/verification');
  var validator = require('validator');
  var router = express.Router();
  var passwordHash = require('password-hash');
  var moment = require('moment');
  var userService = require('../users/service.js');

  // code for account change password
  module.exports =  function(req, res){

      //validation for User email
      if(!validator.isEmail(req.body.email))
      {
          return response(res, null, "invalid email", 422);
      }
      // validation for old password
      if(!validator.isLength(req.body.old_password, 6))
      {
        return response(res, null, "invalid password", 422);
      }
      // validation for new password
      if(!validator.isLength(req.body.password, 6))
      {
        return response(res, null, "invalid password", 422);
      }

      // fetching user by its email
      userService.getUserByEmail(req.body.email).then(function(user){
        if(!user){
          return response(res, null,  "No record found", 204);
        }
        if(passwordHash.verify(req.body.old_password, user.password)){
            // updated!
            user.modified = moment.utc().format();
            user.password = req.body.password;
            user.save().then(function(data){
              if(data){
                 return response(res, null,  "Password changed successfully", 200);
              }
            }).catch(function(err){
             return  response(res, null,  err.message, 500);
            });
        }else{
          return response(res, null, "Old password not matched", 200);
        }

      }).catch(function(err){
        return  response(res, null,  err.message, 500);
      });
  };
