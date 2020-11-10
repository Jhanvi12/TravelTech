'use strict';
var model = require('../../model');
var Ride = model.Ride; // require Ride model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var rideService = require('./service');
var Q = require('q');
module.exports = function(req, res){
    console.log("hsjdh",req.body);
    var inputData = req.body;
    var arr = [];
    inputData.forEach(function(val){
        arr.push(rideService.deleteRideById(val._id));
    });
    Q.all(arr).then(function(data){
        console.log(data);
        return response(res, null,  "ride deleted", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
