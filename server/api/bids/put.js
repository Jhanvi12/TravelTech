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
        if(req.body.vehicle_quote){
         req.body.vehicle_quote.forEach(function(val){
           if(!validator.isMongoId(val.vehicle))
            {
                return response(res, null, "Please enter vehicle", 422);
            }
          if(!validator.isLength(val.bid_amount, 1))
            {
                return response(res, null, "Please enter bid amount", 422);
            }
        });
        }
        if(req.body.bid_status){
            req.body.bid_status = bidStatusEnum.get(req.body.bid_status).value;
        }
      req.body.modified =  Date.now();
      bidService.updateBidById(req.params.id, req.body).then(function(data){
      var res_data = "bid updated";
      // updated
      return  response(res, data,  res_data, 200);
     }).catch(function(err){
     return  response(res, null,  err.message, 500);
    });
};
