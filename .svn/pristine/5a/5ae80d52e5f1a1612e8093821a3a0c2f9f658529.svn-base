'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require to put server side validations
var bidService = require('./service');
var rideService = require('../rides/service');
var notificationService = require('../notifications/service');
var userService = require('../users/service');
var config = require('config');
var Enum = require('enum');
var moment = require('moment');
var bidStatusEnum = new Enum(config.seeds.bid_status);
var Q = require('q');
module.exports = function(req, res){
    //required validation for vehicle type and bid amount
    if(req.body.vehicle_quote){
        req.body.vehicle_quote.forEach(function(val){
            console.log('ride duration is',val.ride_duration);
            if(!validator.isLength(val.ride_duration, 1))
            {
                return response(res,null,"please provide ride duration",422);
            }
              if(!validator.isLength(val.bid_amount, 1))
              {
                return response(res,null,"please provide bid amount",422);
            }
            val.vehicle.forEach(function(item){
                if(!validator.isMongoId(item.id,1))
                {
            return response(res,null,"please enter valid vehicle",422);
                }
            })
        });
    }
    if(!validator.isMongoId(req.body.ride))
    {
        return response(res, null, "Please select ride", 422);
    }
    if(!validator.isLength(req.body.bid_rate_type, 1))
    {
        return response(res, null, "Please enter bid rate type", 422);
    }
    req.body.created =  Date.now();
    req.body.operator = req.user.uid;
    req.body.receiver = req.user.uid;
    req.body.description = "Your Bid is completed";
    req.body.bid_status = bidStatusEnum.get('not_approved').value;

    var jsonData = req.body;
    var arr=[];
    req.body.vehicle_quote.forEach(function(val){
        jsonData.vehicle_quote = val;
        arr.push(bidService.createBid(jsonData));

    })

     userService.getUserById(req.body.receiver).then(function(data){
    console.log("The name is",data.name);
   
    req.body.receiver_name = data.name;

    //creating bid
    rideService.getRideById(req.body.ride).then(function(ride){
        if(ride){
            var dateDifferenceInHours = moment().diff(moment(ride.created), 'hours');
            if(dateDifferenceInHours < config.bidding_expiry){

                return Q.all(arr);

            }else{
                return response(res, null, "Bidding time is expired", 409);
            }
        }
        else{
            return response(res, null, "Please select valid ride", 422);
        }
    }).then(function(data){

        if(!data){
            return response(res, null,  "Failed", 500);
        }
        if(data){
            var arr1 =[];
                data.forEach(function(val){
                if(val.ride && val._id){
                    arr1.push(rideService.updateRideById(val.ride, {$push: {"bids": val._id}}));
                    notificationService.createNotification(req.body).then(function(data) {
                        console.log("notifcation send");
                    })
                }
            });
            return Q.all(arr1).then(function(ride_bid){
                // created!
                return response(res, data[0],  "bid completed", 200);
            });
        }else{
            return  response(res, null,  "bid not posted", 500);
        }
    }).catch(function(err){
        console.log(err)
        return  response(res, null,  err.message, 500);
    });
     });
};
