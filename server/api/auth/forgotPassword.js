'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var verify = require('../../components/verification');
var validator = require('validator');// require for put server side validations
var config = require('config');
var moment = require('moment');
var Enum = require('enum');
var verificationTypeEnum = new Enum(config.seeds.verification);
// code for verify code and activate account
module.exports =  function(req, res){
    //validation for User email
    if(!validator.isEmail(req.body.email))
    {
        return response(res, null, "invalid email", 422);
    }

    User.findOne({email: req.body.email}).exec(function(err, user){
        if(!user){
            return response(res, null,  "Failed", 404);
        }
        if(verify.sendVerificationCode(user, verificationTypeEnum.get("forgetPassword").value)){
            return response(res, null, "verification code sent", 200);
        }
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
