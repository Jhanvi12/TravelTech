'use strict';
  var express = require('express');
  var models = require('../../model');
  var dateDiff = require('../../components/dateOperations');
  var User = models.User;
  var response = require('../../components/response.js');
  var verify = require('../../components/verification');
  var validator = require('validator');
  var userService = require('../users/service');
  var moment = require('moment');
  var router = express.Router();
  var verifyService = require("./service");
  // code for verify code and activate account
  module.exports =  function(req, res){
      //validation for User email
      var d1 = new Date();
      console.log(req.body)
      return verifyService.activateUserAccount(req.body.uid, req.body.code).then(function(data){
          console.log(data);
        if(data){
            return userService.updateUserById(req.body.uid, {is_active: true}).then(function(user) {
                console.log(user)
                return response(res, null, "User is activated", 200);
            });
        }else{
            return response(res, null, "invalid code", 422);
        }
      }).catch(function(err){
          return response(res, null, err.message, 500);
      });
  };
