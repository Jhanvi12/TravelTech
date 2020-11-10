'use strict';
var model = require('../../model');
var DefaultVehicles = model.DefaultVehicles; // require Vehicle Category model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var defaultVehicleService = require('./service');
var Q = require('q');

module.exports = function(req, res){
  var outputJSON = "";
  var errorCount =0;
  var inputData = req.body;
  for(var attributename in inputData){
    var  id = inputData[attributename]._id;
   DefaultVehicles.findById(id, function(err, data) {
     if(err) {
      errorCount++;
    }
    else {
      if(inputData[attributename].enable){
        data.is_active = inputData[attributename].enable;
      }else{
        data.is_approved = inputData[attributename].is_approved;
      }         
      data.save(function(err, data) {
       if(err) {
        errorCount++;
      }
    });
    }
  });
  }
  if(errorCount > 0) {
    outputJSON = {'status': 'success', 'messageId':402, 'message':'Failed'};
  }
  else {
    outputJSON = {'status': 'success', 'messageId':200, 'message':'Success'};
  }
  res.jsonp(outputJSON);
};