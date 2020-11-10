'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var bidService = require('./service');
var rideService = require('../rides/service');
var notificationService = require('../notifications/service');
var userService = require('../users/service');
var config = require('config');
var Enum = require('enum');
var bidStatusEnum = new Enum(config.seeds.bid_status);
var rideStatusEnum = new Enum(config.seeds.ride_status);
module.exports = function(req, res){
    var updateQuery = {};
    if(req.body.bid_status){
        if(!validator.isLength(req.body.bid_status, 1))
        {
            return response(res, null, "invalid category", 422);
        }else{
            updateQuery.bid_status = bidStatusEnum.get(req.body.bid_status).value;
        }
    }
    updateQuery.modified =  Date.now();
    bidService.updateBidById(req.params.id, updateQuery).then(function(data){
        console.log('the logged in user is',req.user.uid);
        req.body.receiver = req.user.uid;
        req.body.description = "Your Ride is booked";
    userService.getUserById(req.body.receiver).then(function(result){
    console.log("The name is",rideStatusEnum.get('upcoming').value);
     req.body.receiver_name = result.name;
        var res_data = "bid updated";
        return rideService.updateRideById(data.ride, {status: rideStatusEnum.get('upcoming').value}).then(function(data1){
            notificationService.createNotification(req.body).then(function(fdata) {
                        console.log("notifcation send");
                    })
            // updated
            return  response(res, data,  res_data, 200);
        });
    })
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
