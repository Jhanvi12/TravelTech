'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
// data travvelling object of role
var driverDto = require('../../dto/driver');
var driverService = require('./service.js');
module.exports = function(req, res){

   driverService.getDriversById(req.params.id).then(function(data){
    if(!data){
      return response(res, null,  "no content", 204);
    }
    // Fetched!
    var result = driverDto.marshal(data);
      return  response(res, result,  "driver's information fetched", 200);
  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};
