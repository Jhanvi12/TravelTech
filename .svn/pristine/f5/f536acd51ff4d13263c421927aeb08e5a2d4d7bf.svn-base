'use strict';
var express = require('express');
var models = require('../../model');
var User = models.Users;
var response = require('../../components/response.js');
var verify = require('../../components/verification.js');
var validator = require('validator');
var router = express.Router();
var passwordHash = require('password-hash');
var moment = require('moment');
var userService = require('../users/service');

// code for verify code and activate account
module.exports =  function(req, res){
    var updateQuery = {};
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
    // validation for password
    if(!validator.isLength(req.body.password, 6))
    {
        return response(res, null, "invalid password", 422);
    }
var user_data = null;
    updateQuery.password = passwordHash.generate(req.body.password);
    updateQuery.modified = moment.utc().format();

    userService.getUserByEmail(req.body.email).then(function(data1){
        if(!data1){
             response(res, null, "invalid user", 422);
              return null;
        }else{
            user_data = data1;
            return verify.isVerified(data1._id, req.body.code);
        }
    }).then(function(data){
        console.log(data)
        if(data){
            return verify.setVerificationStatus(data._id, false);
        }else{
             response(res, null, "invalid code", 422);
             return null;
        }
    }).then(function(data2){
        console.log(data2);
        if(data2){
            return userService.updateUserById(user_data._id, updateQuery)
        }else{
            return null;
        }
    }).then(function(val){
        if(!val){
            return response(res, null,  "Failed", 500);
        }
        return response(res, val, "password reset successfully", 200);
    }).catch(function(err){
        console.log(err)
        return  response(res, null,  err.message, 500);
    });
};
