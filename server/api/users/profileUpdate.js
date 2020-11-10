'use strict';
var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var userService = require('./service');
var fs = require('fs');
var _ = require('lodash');
var passwordHash = require('password-hash');
module.exports = function(req, res){
  var picturename;
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  if(req.file){
    if(req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png'){
      return response(res, null, "invalid image type", 422);
    }else{
      var ext = "";
      if(req.file.mimetype == 'image/jpeg'){
        ext = ".jpg";
      }else{
        ext = ".png";
      }
      picturename = req.file.filename + ext;
      updateQuery.profile_pic = picturename;
    }
  }  
  // checking email
  if(req.body.email){
    //validation for User Email
    if(!validator.isEmail(req.body.email))
    {
      return response(res, null, "invalid email", 422);
    }else{
      updateQuery.email = req.body.email;
    }
  }
  // checking name   
  if(req.body.name){
    //validation for firstname exists
    if(!validator.isLength(req.body.name, 1))
    {
      return response(res, null, "invalid name", 422);
    }else{
      updateQuery.name = req.body.name;
    }
  }
  //checking phone number
  if(req.body.phone_number)
  {
    //validation for User's phone no.
    if(!validator.isNumeric(req.body.phone_number))
    {
      return response(res, null, "invalid phone numbers", 422);
    }else{
      updateQuery.phone_number = req.body.phone_number;
    }
  }  
  // checking job title
  if(req.body.job_title){
    //validation for User password length shoulb be 6 or more
    if(!validator.isLength(req.body.job_title, 1))
    {
      return response(res, null, "invalid job title", 422);
    }else{
      updateQuery.job_title = req.body.job_title;
    }
  }
  // checking department
  if(req.body.department){
    //validation for User password length shoulb be 6 or more
    if(!validator.isLength(req.body.department, 1))
    {
      return response(res, null, "invalid department", 422);
    }else{
      updateQuery.department = req.body.department;
    }
  }
  updateQuery.address = {};
  // checking street
  if(req.body.street){
    //validation for street
    if(!validator.isLength(req.body.street, 1))
    {
      return response(res, null, "invalid street", 422);
    }else{
      updateQuery.address.street = req.body.street;
    }
  }
  // checking city
  if(req.body.city){
    //validation for User password length shoulb be 6 or more
    if(!validator.isLength(req.body.city, 1))
    {
      return response(res, null, "invalid city", 422);
    }else{
      updateQuery.address.city = req.body.city;
    }
  }
  // checking state
  if(req.body.state){
    //validation for state
    if(!validator.isLength(req.body.state, 1))
    {
      return response(res, null, "invalid state", 422);
    }else{
      updateQuery.address.state = req.body.state;
    }
  }
  // checking zipcode
  if(req.body.zip){
    //validation for zipcode
    if(!validator.isNumeric(req.body.zip, 1))
    {
      return response(res, null, "invalid zip", 422);
    }else{
      updateQuery.address.zip = req.body.zip;
    }
  }
  updateQuery.is_active =  req.body.is_active;
  updateQuery.modified =  moment.utc().format();

  // updating new user
  userService.updateUserById(req.params.id, updateQuery).then(function(data){
    if(!data){
      return response(res, null,  "Failed", 500);
    }
    if(req.file){
     var profile_pic_source = config.upload.images.temp + req.file.filename;
     var profile_pic_path =  config.upload.images.main + picturename;
     fs.rename(profile_pic_source, profile_pic_path, function(err){
       if(err){ throw err; }
       return response(res, data,  "user record updated", 200);
     });
   }else{
     return response(res, data,  "user record updated", 200);
   }

 }).catch(function(err){  
  return response(res, null,  err.message, 500);
});
};