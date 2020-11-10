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
    rideService.getUpcomingRidesCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        // console.log("user",user[0].type);
        // user.forEach(function(userData,index,arr){
        //     console.log(type[userData.type-1]);
        //     console.log(arr[index].type)
        //     arr[index].type = "dsnfjsfn";
        // })
        user.forEach(function(part, index, theArray) {
            // console.log("index",index)
            // console.log(theArray[index].type,"theArray[index].type")
            // console.log(type[part.type-1]);
            // theArray[index].type = type[part.type-1];
            theArray[index].routetype = type[part.type-1];
            theArray[index].ridestatus = status[part.status-1];
        });
        console.log("user type after modification",user[0].type);

        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            // if (user[0].type == 1){
            //     // user[0].type = type[0];
            //     // console.log("@@@@",user[0].type);
            //     // console.log("####", type[0]);
            // }
            if (err) console.log(err);
            fs.writeFile('public/uploads/upcomingridesfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/upcomingridesfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
