'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var bidService = require('./service');
var Enum = require('enum');
var config = require('config');
var bidStatusEnum = new Enum(config.seeds.bid_status);
module.exports = function(req, res){
       
       console.log('the req.body in fordriver is',req.body);
       console.log('the driver array is',req.body.driver);
      
      //req.body.modified =  Date.now();
      bidService.updateBidDriverById(req.params.id,req.body.driver).then(function(data){
      var res_data = "bid updated";
      // updated
      return  response(res, data,  res_data, 200);
     }).catch(function(err){
     return  response(res, null,  err.message, 500);
    });
};
