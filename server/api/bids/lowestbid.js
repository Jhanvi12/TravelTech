'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var bidService = require('./service');
var _ = require('underscore');
// "underscore": "^1.8.3", in package.json

module.exports = function(req, res){
    //fetching bid service to get bid by ride id

    bidService.getLowestBidById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      }
        //console.log("data in bid", data);
        var bidArr = [];
        // new code
        data.forEach(function(item){
        if(item.vehicle_quote.length == 1){
          console.log('item.vehicle_quote', item.vehicle_quote);
          console.log('item.vehicle_quote.bid_amount', item.vehicle_quote[0].bid_amount);
          bidArr.push({"amount":item.vehicle_quote[0].bid_amount, "obj":item});
          }else{
          var totalBidAmt = 0;
          item.vehicle_quote.forEach(function(bidamt, i){
            totalBidAmt+=bidamt.bid_amount;
            if(i+1==item.vehicle_quote.length){
              bidArr.push({"amount":totalBidAmt,"obj":item});
            }
          })
        }
        });
        var min = _.min(bidArr,'amount');
        return  response(res, min,  "lowest bid fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
