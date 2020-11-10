'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.Users; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var verify = require('../../components/verification');
var validator = require('validator');// require for put server side validations
var userService = require('../users/service');
var config = require('config');
var moment = require('moment');
var Enum = require('enum');
var verificationTypeEnum = new Enum(config.seeds.verification);
// code for verify code and activate account
module.exports =  function(req, res){
    console.log(req.body);
    //validation for User email
    if(!validator.isEmail(req.body.email))
    {
        return response(res, null, "invalid email", 422);
    }
    return userService.getUserByEmail(req.body.email).then(function(data){
        if(!data){
            return response(res, null,  "Invalid email", 404);
        }
        if(verify.sendVerificationCode(data, verificationTypeEnum.get("forgetPassword").value)){
            console.log("Yes");
            return response(res, null, "verification code sent", 200);
        }
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
