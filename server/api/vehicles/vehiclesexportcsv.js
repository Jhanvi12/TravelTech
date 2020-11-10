'use strict';
var model = require('../../model');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var vehicleDto = require('../../dto/vehicle');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');

module.exports = function(req, res) {
    // return  response(res, null,  "export csv", 200);
    var features =["ac","music system","air bag","false"];
    var fields = ['type','category.category', 'registration_number','vehiclefeatures','cost_per_km','capacity','is_active','is_approved','operator.name','operator.email'];
    var fieldNames = ['type','category','registration_number','vehicle features','cost per kilometer','capacity','is_active','is_approved','operator','operator email'];

    vehicleService.getVehicleCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        user.forEach(function(part, index, theArray) {
            user[index].vehiclefeatures = theArray[index].vehiclefeatures ? theArray[index].vehiclefeatures+" ," : "";
            var newfeatures = [];
            for(var i=0; i < 3; i++){
             newfeatures.push(features[part.features[i]-1]);
            }
            user[index].vehiclefeatures = user[index].vehiclefeatures.concat(newfeatures);
            console.log("@@@@@",newfeatures);
        });
        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/vehiclesfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/vehiclesfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
