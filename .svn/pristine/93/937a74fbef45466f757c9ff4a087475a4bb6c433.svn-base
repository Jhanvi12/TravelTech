'use strict';

var model = require('../../model');
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var moment = require('moment');
var userService = require('./service');

module.exports = function(req, res){
  // companyInfo is a object that store fields that has to be update
   var companyInfo = {};
  // checking company name
  if(req.body.name){
    //validation for vendor company name exists
    if(!validator.isLength(req.body.name, 1))
    {
        return response(res, null, "invalid company name", 422);
    }else{
        companyInfo.name = req.body.name;
    }
  }

  // checking company description
  if(req.body.description){
    //validation for vendor company description exists
    if(!validator.isLength(req.body.description, 1))
    {
        return response(res, null, "invalid company description", 422);
    }else{
      companyInfo.description = req.body.description;
    }
  }

  // checking company address
  if(req.body.address){
    //validation for vendor company address exists
    if(!validator.isLength(req.body.address, 1))
    {
        return response(res, null, "invalid company address", 422);
    }else{
      companyInfo.address = req.body.address;
    }
  }

  // checking company city
  if(req.body.city){
    //validation for company city
    if(!validator.isLength(req.body.city, 1))
    {
        return response(res, null, "invalid company city", 422);
    }else{
      companyInfo.city = req.body.city;
    }
  }

  //checking company phone number
  if(req.body.phone_number)
  {
    //validation for company phone no.
   if(!validator.isNumeric(req.body.phone_number))
   {
       return response(res, null, "invalid phone number", 422);
   }else{
     companyInfo.phone_number = req.body.phone_number;
   }
  }


  // Adding personal info of user
  userService.updateUserById(req.params.id).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   user.company_info = companyInfo;
      user.save().then(function(data){
        if(data){
           return response(res, null,  "company info updated", 200);
        }
      }).catch(function(err){
       return  response(res, null,  err.message, 500);
      });
   var result = userDto.marshal(user);
   return  response(res, result,  "user record updated", 200);
 }).catch(function(err){
   return  response(res, null,  err.message, 500);
 });
};
