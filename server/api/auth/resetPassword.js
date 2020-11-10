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

  // code for verify code and activate account
  module.exports =  function(req, res){
      //validation for User email
      if(!validator.isEmail(req.body.email))
      {
          return response(res, null, "invalid email", 422);
      }
      //validation for code
      if(!validator.isNumeric(req.body.code))
      {
          return response(res, null, "code should be numeric", 422);
      }
      if(!validator.isLength(req.body.code,4))
      {
        return response(res, null, "code length should be 4", 422);
      }
      // validation for password
      if(!validator.isLength(req.body.password, 6))
      {
        return response(res, null, "invalid password", 422);
      }
      
      if(verify.isVerified(req.body.email, req.body.code)){
        User.findOneAndUpdate({email: req.body.email},{password: passwordHash.generate(req.body.password), modified: moment.utc().format()},
          {"new": true}).exec(function(err, user){
          if (err) {
              return response(res, null, err.message, 500);
          }
          // activated!
          user.Verification.status = false; 
          user.save().then(function(data){                    
            if(data){
               return response(res, user, "password reset successfully", 200);          
            }
          }).catch(function(err){
           return  response(res, null,  err.message, 500);
          });
          
        });
      }else{
        return response(res, null, "invalid code", 422);
      }
  };
