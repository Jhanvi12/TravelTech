'use strict';
var model = require('../../model');
var Awaytaxi = model.AwayTaxi;
var Ride = model.Rides;
var Bid = model.Bids;
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var awaytaxiService = require('./service');
var userService = require('../users/service');
var notificationService = require('../notifications/service');
var rideService = require('../rides/service');
var bidService = require('../bids/service');
var Enum = require('enum');
var rideStatusEnum = new Enum(config.seeds.ride_status);
var rideTypeEnum = new Enum(config.seeds.ride_type);
var bidStatusEnum = new Enum(config.seeds.bid_status);
var Q = require('q');
var rideid = null;
var bidid = null;
module.exports = function(req, res){
    var query = {};
    query.$and = [
    {"route.date_time" : req.body.datefrom},
     {
        "route.address.street" : req.body.route[0].address.street,
        "route.address.city" : req.body.route[0].address.city,
        "route.address.state" : req.body.route[0].address.state,
        "route.address.country" : req.body.route[0].address.country
      },
      {
        "route.address.street" : req.body.route[1].address.street,
        "route.address.city" : req.body.route[1].address.city,
        "route.address.state" : req.body.route[1].address.state,
        "route.address.country" : req.body.route[1].address.country
     }
    ];
   console.log("req.body.route[0]",req.body.route[0]);
   console.log("req.body.route[1]",req.body.route[1]);
       var arr = []; 

    Ride.find(query).exec(function(err,ridedata){
        console.log("ridedata",ridedata&&ridedata.length);
        if(ridedata.length > 0){
        rideid = JSON.stringify(ridedata[0]._id);

        req.body.operator = req.user.uid;
                console.log("rideid",rideid);
                var array = rideid.split('"');
                // console.log(array);
                req.body.ride = array[1];
                console.log("req.body.ride",req.body.ride);
                // arr.push(bidService.createBid(req.body));
                arr.push(bidService.createBid(req.body).then(function(res) {
                                     console.log("############res############");
                                     console.log(JSON.stringify(res));
                                     var resStringData = JSON.stringify(res);
                                     var resData = JSON.parse(resStringData);
                                     console.log("resData.ride")
                                     console.log(resData.ride)
                                     console.log(resData._id)
                                    // bidid = JSON.stringify(res._id);
                                    // console.log("bidid",bidid);
                                    // var array1 = bidid.split('"');
                                     // console.log("array1",array1);
                                    // req.body.bidid = array1[1];
                                    // console.log("req.body.bidid",req.body.bidid);
                                    Ride.update({_id: resData.ride},{ $push: { "bids":resData._id  }},function(err,data){
                                        console.log(err?err:data)
                                    });
                                }));
             

        
        }

        //for away taxi post    
       
        console.log('req.user', req.user);
        req.body.user=req.user.uid;
        req.body.receiver = req.user.uid;
        req.body.description = "Your Bid is Accepted";
        userService.getUserById(req.body.receiver).then(function(data){
        req.body.receiver_name = data.name;
        var route_details = req.body.route;
                req.body.route = [];
                req.body.route[0] = route_details[0];
                req.body.route[1] = route_details[1];
                arr.push(awaytaxiService.createawaytaxi(req.body));
                Q.all(arr).then(function(data){
                    notificationService.createNotification(req.body).then(function(res) {
                                    console.log("notifcation send");
                                })
                 if(!data){
                   return response(res, null,  "Failed", 500);
                 }
                 var obj = {};
                 obj.data = data;
                 console.log('data', data)
                 console.log('obj', obj)
                 // created!
                 return  response(res, obj,ridedata,  "AwayTaxi created successfully", 200);

               }).catch(function(err){
                   console.log(err);
                 return  response(res, null,  err.message, 500);
               });
            
    });
});
};
