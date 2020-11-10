'use strict';
var model = require('../../model');
var Preference = model.Preferences; // require preference model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var preferenceService = require('./service');
module.exports = function(req, res){
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  if(req.body.bidding_time_limit){
    //validation for bidding_time_limit exists
    if(!validator.isNumeric(req.body.bidding_time_limit))
    {
      return response(res, null, "invalid preference", 422);
    }else{
      updateQuery.bidding_time_limit = req.body.bidding_time_limit;
    }
  }  
  if(req.body.commission_rate){
    //validation for commission_rate exists
    if(!validator.isNumeric(req.body.commission_rate))
    {
      return response(res, null, "invalid commission rate", 422);
    }else{
      updateQuery.commission_rate = req.body.commission_rate;
    }
  } 
  if(req.body.markup_bid_rate){
    //validation for bid_rate exists
    if(!validator.isNumeric(req.body.markup_bid_rate))
    {
      return response(res, null, "invalid bid rate", 422);
    }else{
      updateQuery.markup_bid_rate = req.body.markup_bid_rate;
    }
  }
  updateQuery.bidding_acceptance_time = {};
  if(req.body.bidding_acceptance_time.less_than_2_days){
    //validation for acceptance time exists
    if(!validator.isNumeric(req.body.bidding_acceptance_time.less_than_2_days))
    {
      return response(res, null, "invalid acceptance time", 422);
    }else{
      updateQuery.bidding_acceptance_time.less_than_2_days = req.body.bidding_acceptance_time.less_than_2_days;
    }
  }
  if(req.body.bidding_acceptance_time.between_3_4_days){
    //validation for acceptance time exists
    if(!validator.isNumeric(req.body.bidding_acceptance_time.between_3_4_days))
    {
      return response(res, null, "invalid acceptance time", 422);
    }else{
      updateQuery.bidding_acceptance_time.between_3_4_days = req.body.bidding_acceptance_time.between_3_4_days;
    }
  }
  if(req.body.bidding_acceptance_time.more_than_4_days){
    //validation for acceptance time exists
    if(!validator.isNumeric(req.body.bidding_acceptance_time.more_than_4_days))
    {
      return response(res, null, "invalid acceptance time", 422);
    }else{
      updateQuery.bidding_acceptance_time.more_than_4_days = req.body.bidding_acceptance_time.more_than_4_days;
    }
  }

  updateQuery.modified =  moment.utc().format();

  preferenceService.updatePreference(updateQuery).then(function(data){
   if(!data){
     return response(res, null,  "Failed", 500);
   }     
   return  response(res, data,  "preference updated", 200);
 }).catch(function(err){
   return  response(res, null,  err.message, 500);
 });
};