'use strict';
var model = require('../../model');
var Ride = model.Ride; // require Ride model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var rideService = require('./service');
var notification = require('../../components/notification');/*Notification to send*/
var config = require('config');
var Enum = require('enum');
var userService = require('../users/service');/*To fetch name for notification*/
var notificationService = require('../notifications/service');
var rideStatusEnum = new Enum(config.seeds.ride_status);
module.exports = function(req, res){
   console.log(req.body,req.params.id);
    req.body.modified =  Date.now();
    /*Data for creation of notifications*/
    var notificationData = {};
        console.log("body",req.body);
    var ridestatus = '';
    if(req.body.status){
            req.body.status = rideStatusEnum.get(req.body.status).value;
            ridestatus = rideStatusEnum.get(req.body.status).value;
    }

    console.log('ride status',ridestatus);
    if(ridestatus == '4'){
    notificationData.created = Date.now();
    notificationData.operator = req.user.uid;
    notificationData.receiver = req.user.uid;
    notificationData.description = "Your Ride is cancelled";
     }


    rideService.updateRideById(req.params.id, req.body).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
     }
      // updated!
       console.log('The notification data is',notificationData);
        userService.getUserById(notificationData.receiver).then(function(data1){
        notificationData.receiver_name = data1.name;
        notificationService.createNotification(notificationData).then(function(data) {
                        console.log("notifcation send");
                      });
     });


     return  response(res, data,  "ride updated", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
