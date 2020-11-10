'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var bidService = require('./service');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');

module.exports = function(req, res) {
    console.log("bids");
    // return  response(res, null,  "export csv", 200);
    var status = ["not_approved","approved", "canceled"];
    var type = ["one way", "multi way","airport dropoff","airport pickup","local","return trip"];
    var fields = ['operator.name','vehicle_quote[0].vehicle[0].id.type','bid_rate_type','bidstatus','vehicle_quote[0].bid_amount','ride.route[0].address.city', 'ride.route[1].address.city'];
    var fieldNames = ['operator','vehicle','bid rate type','status','Amount','route from', 'route to'];
    bidService.getBidsCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        user.forEach(function(part, index, theArray) {
            // theArray[index].routetype = type[part.type-1];
            theArray[index].bidstatus = status[part.bid_status-1];
        });
        console.log("bids", user);
        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/bidsfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/bidsfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
