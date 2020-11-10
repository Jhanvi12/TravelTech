'use strict';
var model = require('../../model');
var Preference = model.Preference; // require Preference model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var preferenceService = require('./service');
module.exports = function(req, res){
    //validation for bidding time limit exists
    if(!validator.isNumeric(req.body.bidding_time_limit, 1))
    {
        return response(res, null, "invalid bidding time limit", 422);
    }
    if(!validator.isNumeric(req.body.commission_rate, 1))
    {
        return response(res, null, "invalid commission rate", 422);
    }
    if(!validator.isNumeric(req.body.markup_bid_rate, 1))
    {
        return response(res, null, "invalid bid rate", 422);
    }

    preferenceService.createPreference(req.body).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
   }
     // created!
     return  response(res, data,  "preference created successfully", 200);
 }).catch(function(err){
     console.log(err)
     return  response(res, null,  err.message, 500);
 });
};
