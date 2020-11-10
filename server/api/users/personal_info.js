'use strict';

var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var moment = require('moment');
var userService = require('./service');

module.exports = function(req, res){
  // // updateQuery is a object that store fields that has to be update
   var updateQuery = {};
   console.log('The req is',req);
  // checking vendor address
  if(req.body.vendor_address){
    //validation for vendor address exists
    if(!validator.isLength(req.body.vendor_address, 1))
    {
        return response(res, null, "invalid address", 422);
    }else{
      updateQuery.vendor_address = req.body.vendor_address;
    }
  }
  // checking vendor city
  if(req.body.vendor_city){
    //validation for vendor city exists
    if(!validator.isLength(req.body.vendor_city, 1))
    {
        return response(res, null, "invalid city", 422);
    }else{
      updateQuery.vendor_city = req.body.vendor_city;
    }
  }
  // checking owner name
  if(req.body.owner_name){
    //validation for owner name exists
    if(!validator.isLength(req.body.owner_name, 1))
    {
        return response(res, null, "invalid owner name", 422);
    }else{
      updateQuery.owner_name = req.body.owner_name;
    }
  }
  //checking owner phone number
  if(req.body.owner_phone_number)
  {
    //validation for User's phone no.
   if(!validator.isNumeric(req.body.owner_phone_number))
   {
       return response(res, null, "invalid phone number", 422);
   }else{
     updateQuery.owner_phone_number = req.body.owner_phone_number;
   }
  }
  // checking working hours
  if(req.body.working_hours){
    //validation for vendor working hours
    if(!validator.isLength(req.body.working_hours, 1))
    {
        return response(res, null, "invalid working hours", 422);
    }else{
      updateQuery.working_hours = req.body.working_hours;
    }
  }
  // checking service tax number
  if(req.body.service_tax_number){
    //validation for vendor service tax number
    if(!validator.isNumeric(req.body.service_tax_number, 1))
    {
        return response(res, null, "invalid service tax number", 422);
    }else{
      updateQuery.service_tax_number = req.body.service_tax_number;
    }
  }
  // checking pan number
  if(req.body.pan_number){
    //validation for vendor pan number
    if(!validator.isLength(req.body.pan_number, 1))
    {
        return response(res, null, "invalid pan number", 422);
    }else{
      updateQuery.pan_number = req.body.pan_number;
    }
  }
  // checking vendor website
  if(req.body.website){
    //validation for vendor website exists
    if(!validator.isLength(req.body.website, 1))
    {
        return response(res, null, "invalid website address", 422);
    }else{
      updateQuery.website = req.body.website;
    }
  }
  // checking cancellation policy
  if(req.body.cancellation_policy){
    console.log('The policy is',req.body.cancellation_policy);
    //validation for vendor cancellation policy exists
    if(!validator.isLength(req.body.cancellation_policy, 1))
    {
        return response(res, null, "invalid cancellation policy", 422);
    }else{
      updateQuery.cancellation_policy = req.body.cancellation_policy;
    }
  }

  // checking operating location
  if(req.body.operating_location){
    //validation for vendor operating location
    if(!validator.isLength(req.body.operating_location, 1))
    {
        return response(res, null, "invalid operating location", 422);
    }else{
        updateQuery.operating_location = req.body.operating_location;
    }
  }


  // Adding personal info of user
 console.log('The update query is',req.body);
 userService.updateUserById(req.params.id, {operator_info:updateQuery}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   return  response(res, user,  "user record updated", 200);
 }).catch(function(err){
   return  response(res, null,  err.message, 500);
 });
};
