'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var verify = require('../../components/verification');
var validator = require('validator');// require for put server side validations
var config = require('config');
var userService = require('./service');
var passwordHash = require('password-hash');
var moment = require('moment');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
var modulesEnum = new Enum(config.seeds.modules);
var modulesData = {};
  modulesData = modulesEnum['enums'];  
  var modules = new Array();
  for (var i = 0; i < modulesEnum['enums'].length; i++)  
    modules.push(new Object({"module":modulesEnum['enums'][i].value}));

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
    //validation for job title
    if(req.body.job_title){
      if(!validator.isLength(req.body.job_title, 1))
      {
        return response(res, null, "invalid job title", 422);
      }
    }
    //validation for department
    if(req.body.department){
      if(!validator.isLength(req.body.department, 1))
      {
        return response(res, null, "invalid department", 422);
      }
    }

    if(req.body.type == "employee"){
      req.body.permissions = modules;
    }

    console.log(req.body);
    // generate OTP code for verification
    var code = Math.floor(Math.random() * 10000) + 1;
    var reference_code = req.body.name.substring(0, 3).toUpperCase() + code;
    var jsonData = req.body;
    jsonData.role = userRoleEnum.get(req.body.type).value;
    jsonData.reference_code = reference_code;
    jsonData.password = passwordHash.generate(jsonData.password);
    jsonData.is_deleted = false;
    jsonData.is_approved = false;
    jsonData.created =  moment.utc().format();
    jsonData.modified =  moment.utc().format();
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
      if(verify.sendVerificationCode(data, req.body.email, code)){
        return response(res, data, "user created successfully", 200);
      }
    }).catch(function(err){
      return response(res, null,  err.message, 500);
   });
  };
