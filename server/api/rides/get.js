'use strict';
var model = require('../../model');
var Ride = model.Ride; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var rideService = require('./service');
var model = require('../../model');
var Bid = model.Bids;
module.exports = function(req, res){

    rideService.getRideById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      }
      console.log("ride", data);
        return  response(res, data,  "ride fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
