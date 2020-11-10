'use strict';
var model = require('../../model');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var driverService = require('./service');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');

module.exports = function(req, res) {
    // return  response(res, null,  "export csv", 200);
    var fields = ['name', 'phone_number','is_active','is_approved','operator.name','operator.email'];
    var fieldNames = ['name', 'phone_number','is_active','is_approved','operator','operator email'];
    driverService.getDriverCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        json2csv({
            data: user,
            fields: fields,
            fieldNames: fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/driverfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/driverfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
