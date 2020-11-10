'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var vehicleDto = require('../../dto/vehicle');
var Q = require('q');
module.exports = function(req, res){
  var query = {};
  query.is_deleted = false;
  if(req.query.type && req.query.type != 'undefined'){
    query.$or = [
        { 'type' : new RegExp('^'+req.query.type, "i") }
    ];
  }
  if(!req.query.all){
    query.operator = req.query.operator ? req.query.operator : req.user.uid;
  }
  if(req.query.approved){
      query.is_approved = true;
  }
  var limit = 10;
  Q.all([vehicleService.getVehicleList(query, req.query.offset, limit), vehicleService.getCount(query)]).then(function(result){
    if(!result){
      return response(res, null,  "no content", 204);
    }
    //Fetched!
    var arr = [];
    result[0].forEach(function(val){
     arr.push(vehicleDto.marshal(val));
    });
    var data = {};
    data.count = result[1];
    data.data = arr;
    console.log(data);
    return  response(res, data,  "vehicle's information fetched", 200);

  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};
