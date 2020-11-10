'use strict';
var model = require('../../model');
var Awaytaxi = model.AwayTaxi;
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var awaytaxiService = require('./service');

var Q = require('q');
module.exports = function(req, res){
    var inputData = req.params.id;
    console.log('the data isss',inputData);
  
awaytaxiService.deleteawaytaxiById(inputData).then(function(data){
        return response(res, null,  "deleted successfully", 200);
    }).catch(function(err){
        return response(res, null,  err.message, 500);
    });
};

