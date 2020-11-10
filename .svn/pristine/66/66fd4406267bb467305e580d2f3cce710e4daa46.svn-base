 'use strict';
var model = require('../../model');
var Awaytaxi = model.AwayTaxi;
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var awaytaxiService = require('./service');
module.exports = function(req, res){
  console.log('u are in correct file',req.body,req.params.id);
  console.log('req.body',req.body);
  var tot_body = req.body;
  var updateQuery={};
 
 
  updateQuery.priceoffer=req.body.priceoffer;
  updateQuery.datefrom=req.body.datefrom;
  updateQuery.dateto=req.body.dateto;
  updateQuery.vehicle_id=req.body.vehicle_id;
  updateQuery.route_itineary = req.body.route_itineary;
  updateQuery.route = req.body.route;
  // updateQuery.route[1] =  req.body.route[1];
   var route_details = req.body.route;
        console.log('req.body.route', req.body.route)
        console.log('route_details', route_details)
        console.log('route_details.length', route_details.length)
       req.body.route = [];
       req.body.route[0] = route_details[0];
       req.body.route[1] = route_details[1];

Awaytaxi.update({"_id":req.params.id},{$set:updateQuery},function(err,data){
if(err){
  console.log('the error is',err);
  return response(res,null,err.message,500);
}else{
  console.log('the data is',data);
  return response(res,data,"updated successfully",200);
}
});
  };