 'use strict';
var model = require('../../model');
var City = model.City; // require city model
var Inventory = model.Inventories; // require city model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var inventoryService = require('./service');
module.exports = function(req, res){
  console.log('u are in correct file',req.body,req.params.id);
  console.log('req.body',req.body);
  var tot_body = req.body;
  var updateQuery={};
 
  if(req.body.guest_name){
        if(!validator.isLength(req.body.guest_name, 1))
        {
            return response(res, null, "Invalid Guest_name", 422);
        }else{
            updateQuery.guest_name = req.body.guest_name;
        }
    }
    if(req.body.guest_phone_number){
       if(!validator.isLength(req.body.guest_phone_number, 1))
        {
            return response(res, null, "invalid phone number", 422);
        }else{
            updateQuery.guest_phone_number = req.body.guest_phone_number;
        }
    }
    if(req.body.guest_email){
       if(!validator.isLength(req.body.guest_email, 1))
        {
            return response(res, null, "invalid phone number", 422);
        }else{
            updateQuery.guest_email = req.body.guest_email;
        }
    }
  updateQuery.booking_date=req.body.booking_date;
  updateQuery.driver_expense=req.body.driver_expense;
  updateQuery.driver_allowances=req.body.driver_allowances;
  updateQuery.advance_received=req.body.advance_received;
  updateQuery.remark=req.body.remark;
  updateQuery.pickup_date=req.body.pickup_date;
  updateQuery.dropoff_date=req.body.dropoff_date;
  updateQuery.holding_time=req.body.holding_time;
  updateQuery.booking_from=req.body.booking_from;
  updateQuery.booking_id=req.body.booking_id;
  updateQuery.booking_price=req.body.booking_price;
  updateQuery.total_bookingAmount=req.body.total_bookingAmount;
  updateQuery.driver_id=req.body.driver_id;
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

Inventory.update({"_id":req.params.id},{$set:updateQuery},function(err,data){
if(err){
  console.log('the error is',err);
  return response(res,null,err.message,500);
}else{
  console.log('the data is',data);
  return response(res,data,"updated successfully",200);
}
});
  };