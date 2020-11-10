'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var bidService = require('./service');

module.exports = function(req, res){
    //fetching bid service to get bid by id

    bidService.getBidById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      }
        //console.log("data in bidbyid",data);
        return  response(res, data,  "bid fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
