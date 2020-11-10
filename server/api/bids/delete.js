'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var BidService = require('./service');
var userService = require('../users/service');
var ridesService = require('../rides/service');
var notificationService = require('../notifications/service');
module.exports = function(req, res){
 
 var notificationData = {};
   
    notificationData.created = Date.now();
    notificationData.sender = req.user.uid;
    notificationData.description = "Your Ride is cancelled";

 BidService.deleteBidById(req.params.id).then(function(data){
    	    ridesService.getRideByIds(req.params.id).then(function(data1){
            console.log('the data1 is',JSON.stringify(data1));
            notificationData.receiver_name=data1.customer.name;
           notificationData.receiver  =data1.customer._id;
           console.log('the notification data is',notificationData);
    	 notificationService.createNotification(notificationData).then(function(data) {
                        console.log("notifcation send");
                      });
    	   });

        return response(res, data,  "bid deleted", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
