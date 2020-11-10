'use strict';
  var express = require('express');
  var models = require('../../model');
  var User = models.User;
  var mail = require('../../components/email');  // require email component
  var sms = require('../../components/sms');  // require sms component
  var verify = require('../../components/verification');  // require verification component
  var response = require('../../components/response.js');
  var userService = require('../users/service');
  var validator = require('validator');
    var moment = require('moment');

  module.exports = function(req, res){
      //validation for User email
      if(!validator.isEmail(req.body.email))
      {
          return response(res, null, "invalid email", 422);
      }

      userService.getUserByEmail(req.body.email).then(function(user){                   
          if(user){
            var code = Math.floor(Math.random() * 10000) + 1;
            if(verify.sendVerificationCode(user, req.body.email, code)){ 
                user.Verification.code = code;
                user.Verification.created = moment.utc().format();
                user.Verification.status = true;                
                user.save().then(function(data){                    
                  if(data){
                     return response(res, user, "verification code resended", 200);                  
                  }
                }).catch(function(err){
                 return  response(res, null,  err.message, 500);
                });                
            }           
          }else{
            return response(res, null,  "email doesn't not exists", 404);                          
          }
      }).catch(function(err){
       return  response(res, null,  err.message, 500);
    });
  };
