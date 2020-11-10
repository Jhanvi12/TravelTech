'use strict';
var model = require('../../model');
var User= model.User; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var userService = require('./service');
var Q = require('q');
var json2csv= require('json2csv');
var fs = require('fs');


module.exports = function(req, res, next) {
    // return  response(res, null,  "export csv", 200);
    var fields = ['name', 'email','phone_number','is_active'];
    var fieldNames = ['name', 'email','phone_number','is_active'];

    userService.getCorporateCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
       
     
        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/corporatefile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/corporatefile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });
};
