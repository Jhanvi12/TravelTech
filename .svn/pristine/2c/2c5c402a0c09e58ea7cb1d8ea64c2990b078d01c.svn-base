'use strict';
var model = require('../../model');
var City = model.City; // require City model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations 
var config = require('config');
var inventoryService = require('./service');
var userService = require('../users/service');
var bidService = require('../bids/service');
var notificationService = require('../notifications/service');
var Q = require('q');
module.exports = function(req, res){
        var arr = [];
        console.log('req.user', req.user);
        req.body.user=req.user.uid;
        req.body.receiver = req.user.uid;
        req.body.description = "Your Bid is Accepted";
        userService.getUserById(req.body.receiver).then(function(data){
            console.log('req.body.receiver', data);

             console.log('The data is ',req.body);
                console.log('req.body.ride_id ',req.body.ride_id);
                    req.body.user=req.user.uid;
                if(req.body.ride_id != undefined){
                    console.log('Inside');
                    inventoryService.createInventory(req.body).then(function(data){
                         if(!data){
                           return response(res, null,  "Failed", 500);
                    }
                         return  response(res, data,  "Inventories created successfully", 200);
                    }).catch(function(err){
                         console.log(err)
                         return  response(res, null,  err.message, 500);
                    });
                }
        req.body.receiver_name = data.name;
        var route_details = req.body.route;
      

                req.body.route = [];
                req.body.route[0] = route_details[0];
                req.body.route[1] = route_details[1];
            
                 console.log('req.body',req.body);
                arr.push(inventoryService.createInventory(req.body));
              
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
                 return  response(res, obj,  "Inventories created successfully", 200);
               }).catch(function(err){
                   console.log(err);
                 return  response(res, null,  err.message, 500);
               });

    });
};

