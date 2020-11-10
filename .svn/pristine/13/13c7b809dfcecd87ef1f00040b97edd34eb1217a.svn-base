  'use strict';
  var response = require('../../components/response'); // require response js for setting headers variables
  var validator = require('validator'); // require for put server side validations
  var moment=require('moment');
  var Q = require('q');
  var model = require('../../model');
  var config = require('config');
  var Review  = model.Reviews;
  var User= model.Users;
  var driver = model.Drivers; 
  var vehicle = model.Vehicles; 
  var ratingService = require('./service');
  var expressJwt = require('express-jwt');
  var jwt = require('jsonwebtoken');
  var _=require('underscore');

  module.exports=function(req,res){
    console.log('The param id is',req.params);
    ratingService.getReviewById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      } var data_array=[];
        var veh_array=[]; 
        var driver_rat=[];
        var vehicle_rat=[];
        var sumofdriver_rat=0;
        var sumofvehicle_rat=0;
        var totalav=0;
        var totalopav=0;
        console.log('The data fetched is',data);
        data.forEach(function(item){
           if(!item.driver.driver_details.length == 0 && !item.vehicle.vehicle_details.length == 0)
            data_array.push(item);
         });
        data_array.forEach(function(items){
        driver_rat.push(items.driver.rating);
        vehicle_rat.push(items.vehicle.rating);
        });
        console.log(driver_rat,vehicle_rat);
       
     for(var i=0; i < driver_rat.length; i++){

    sumofdriver_rat += parseInt(driver_rat[i]);
   }
var d_average=sumofdriver_rat/driver_rat.length;
for(var j=0; j < vehicle_rat.length; j++){

    sumofvehicle_rat += parseInt(vehicle_rat[j]);
}
var v_average=sumofvehicle_rat/vehicle_rat.length;
var totalav=d_average+v_average;
if(totalav)
var totalopav=totalav/2;
else
var totalopav=0;

console.log('the operator rating is',totalopav);
User.update({"_id": req.params.id},{$set:{review:totalopav}},function(err,user){
if(err){
  console.log('the error is',err);
}
else{
  console.log('the data is user',user);
  return  response(res, totalopav,  "review fetched", 200);
}
});
     
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
  };