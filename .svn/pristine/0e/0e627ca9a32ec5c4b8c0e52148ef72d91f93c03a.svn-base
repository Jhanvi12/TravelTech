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
    var fields = ['name', 'email','phone_number','operator_info.operating_location','address2','review','is_active'];
    var fieldNames = ['name', 'email','phone_number','operating location','address','rating','is_active'];
    var query = {};
    var query = {};
    query.is_deleted = false;
    query.role = 2;
    if(req.params.search && req.params.search != 'undefined'){
      query.$or = [
        { 'name' : new RegExp('^'+req.params.search, "i") },
        { 'job_title' : new RegExp('^'+req.params.search, "i") },
        { 'department' : new RegExp('^'+req.params.search, "i") },
        { 'address.city' : new RegExp('^'+req.params.search, "i") }
      ];
    }
    userService.getOperatorCsvFile(req.params.cities, query).then(function(user) {

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
            fs.writeFile('public/uploads/operatorfile.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                res.download('public/uploads/operatorfile.csv');
            });
        })
    }).catch(function(err) {
        return response(res, null, err.message, 500);
    });
};
