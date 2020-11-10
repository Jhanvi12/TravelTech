'use strict';
var model = require('../../model');
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var verify = require('../../components/verification');
var validator = require('validator');// require for put server side validations
var config = require('config');
var userService = require('../users/service');
var notificationService = require('../notifications/service');
var notificationService = require('../notifications/service');
var passwordHash = require('password-hash');
var moment = require('moment');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
var verificationTypeEnum = new Enum(config.seeds.verification);
module.exports = function(req, res){
    //validation for User Email
    if(!validator.isEmail(req.body.email))
    {
        return response(res, null, "invalid email", 422);
    }
    //validation for User role
    if(!validator.isLength(req.body.type, 1))
    {
      return response(res, null, "invalid type", 422);
    }
    //validation for firstname
    if(!validator.isLength(req.body.name, 1))
    {
        return response(res, null, "invalid name", 422);
    }
     //validation for User's phone no.
    if(!validator.isNumeric(req.body.phone_number))
    {
        return response(res, null, "invalid phone number", 422);
    }
    //validation for User password length shoulb be 6 or more
    if(!validator.isLength(req.body.password, 6))
    {
        return response(res, null, "invalid password", 422);
    }

    // generate OTP code for verification
    var code = Math.floor(Math.random() * 10000) + 1;
    var reference_code = req.body.name.substring(0, 3).toUpperCase() + code;
    var jsonData = req.body;
    jsonData.role = userRoleEnum.get(req.body.type).value;
    jsonData.reference_code = reference_code;
    jsonData.password = passwordHash.generate(jsonData.password);
    jsonData.is_active = false;
    jsonData.is_deleted = false;
    jsonData.is_approved = false;
    jsonData.address = req.body.address;
    jsonData.created =  moment.utc().format();
    jsonData.modified =  moment.utc().format();
    // req.body.receiver = "571f10f93a26d0ff0ac24c25";
    // req.body.receiver = "56d931efd74aea4655de002f";
    // req.body.description = "New operator registered";
    // create new user if not already registered
    userService.getUserByEmail(jsonData.email).then(function(data){
        if(data){
          return response(res, null,  "email already in use.", 409);
        }
        else{
            return userService.getUserByPhone(jsonData.phone_number);
        }
    }).then(function(data){
        if(data){
          return response(res, null,  "phone number already in use.", 409);
        }
        else{
            return userService.createUser(jsonData);
        }
    }).then(function(data){
      if(!data){
        return response(res, null,  "Failed", 500);
      }
      // created!
      if(verify.sendVerificationCode(data, verificationTypeEnum.get("signup").value)){
         // if(jsonData.role == 2){
         // notificationService.createNotification(req.body).then(function(data) {
         //                console.log("notifcation send");
         //            })
         //     }
        return response(res, data, "user created successfully", 200);
        }else{
        return response(res, data, "user created successfully", 209);
     }
    }).catch(function(err){
     return  response(res, null,  err.message, 500);
    });
};
