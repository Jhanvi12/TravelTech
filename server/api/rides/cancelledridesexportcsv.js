'use strict';
var model = require('../../model');
var Ride = model.Ride; // require Role model
var rideService = require('./service');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');

module.exports = function(req, res) {
    // return  response(res, null,  "export csv", 200);
    var status = ["open", "upcoming", "completed", "canceled", "noshow"];
    var type = ["one way", "multi way","airport dropoff","airport pickup","local","return trip"];
    var fields = ['customer.name','passenger_count','vehicles_count','routetype','ridestatus','bids.length','route[0].address.city', 'route[1].address.city'];
    var fieldNames = ['customer','passengers','vehicles','route type','ride status','bids','route from', 'route to'];
    rideService.getCancelledRidesCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        user.forEach(function(part, index, theArray) {
            theArray[index].routetype = type[part.type-1];
            theArray[index].ridestatus = status[part.status-1];
        });
        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/cancelledridesfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/cancelledridesfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
