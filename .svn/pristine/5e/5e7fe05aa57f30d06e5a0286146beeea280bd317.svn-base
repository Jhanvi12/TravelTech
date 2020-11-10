'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var vehicleDto = require('../../dto/vehicle');
module.exports = function(req, res){

   vehicleService.getVehicleById(req.params.id).then(function(data){
    if(!data){
      return response(res, null,  "no content", 204);
    }
    // Fetched!
    var result = vehicleDto.marshal(data);
      return  response(res, result,  "vehicle's information fetched", 200);
  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};
