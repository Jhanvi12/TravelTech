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
    var fields = ['name', 'email','phone_number','address2','is_active'];
    var fieldNames = ['name', 'email','phone_number','address','is_active'];

    userService.getCustomerCsvFile().then(function(user) {
        if (!user) {
            return response(res, null, "no content", 204);
        }
        user.forEach(function(part, index, theArray) {
            user[index].address2 = theArray[index].address2 ? theArray[index].address2+" ," : "";
            user[index].address2 = user[index].address2.concat(part.address[0].street+" ,"+part.address[0].city+" ,"+part.address[0].country+" ,"+part.address[0].zip);
        });
        json2csv({
            data: user,
            fields: fields,
            fieldNames:fieldNames
        }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('public/uploads/customerfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/customerfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });
};
