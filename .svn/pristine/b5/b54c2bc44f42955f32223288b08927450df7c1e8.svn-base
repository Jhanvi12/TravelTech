'use strict';
var model = require('../../model');
var Ride = model.Ride; // require Ride model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require to put server side validations
var rideService = require('./service');
var userService = require('../users/service');
var notificationService = require('../notifications/service');
var config = require('config');
var Enum = require('enum');
var rideStatusEnum = new Enum(config.seeds.ride_status);
var rideTypeEnum = new Enum(config.seeds.ride_type);
var Q = require('q');
module.exports = function(req, res){
    //required validation for pick up info address,date time,drop off info address,date time etc
    if(!validator.isNumeric(req.body.passenger_count))
    {
        return response(res, null, "Please enter number of passenger", 422);
    }
    if(req.body.stop_time){
        req.body.stop_time = req.body.stop_time * 60;
    }
    req.body.customer = req.user.uid;
    req.body.receiver = req.user.uid;
    req.body.description = "Your ride is created";
    req.body.status =  rideStatusEnum.get("open").value;
    req.body.type =  rideTypeEnum.get(req.body.type).value;
    req.body.created =  Date.now();
    var arr = [];
     userService.getUserById(req.body.receiver).then(function(data){
    console.log("The name is",data.name);
     req.body.receiver_name = data.name;
    //creating ride
    console.log(req.body.duration, "duration");
    if(req.body.duration){
        arr.push(rideService.createRide(req.body));
    }else{
        var route_details = req.body.route;
        for(var i=0; i<route_details.length-1; i++){
            req.body.route = [];
            req.body.route[0] = route_details[i];
            req.body.route[1] = route_details[i+1];
            arr.push(rideService.createRide(req.body));
        }
    }
    Q.all(arr).then(function(data){
        notificationService.createNotification(req.body).then(function(data) {
                        console.log("notifcation send");
                    })
     if(!data){
       return response(res, null,  "Failed", 500);
     }
     var obj = {};
     obj.data = data;
     // created!
     return  response(res, obj,  "ride created", 200);
   }).catch(function(err){
       console.log(err);
     return  response(res, null,  err.message, 500);
   });
});
};
