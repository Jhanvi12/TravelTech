'use strict';
var model = require('../../model');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var City = model.City; // require city model
var cityService = require('./service');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');

module.exports = function(req, res) {
    // return  response(res, null,  "export csv", 200);
    var fields = ['city','state','zip'];
    cityService.getCitiesCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        json2csv({
            data: user,
            fields: fields
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/citiesfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/citiesfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });

};
