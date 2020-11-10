'use strict';

var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var userService = require('../users/service');

module.exports = function(req, res){

  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};

  updateQuery.modified =  moment.utc().format();
  updateQuery.is_approved =  true;

  // updating new user
  userService.updateUserById(req.params.id, updateQuery).then(function(data){
   if(!data){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   var result = userDto.marshal(data);
   return  response(res, result,  "operator approved successfully", 200);
 }).catch(function(err){
   return  response(res, null,  err.message, 500);
 });

};
