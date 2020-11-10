'use strict';
var model = require('../../model');
var VehicleCategory = model.VehicleCategory; // require Vehicle Category model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleCategoryService = require('./service');
var moment = require('moment');
module.exports = function(req, res){
    //validation for vehicle category name exists
    if(!validator.isLength(req.body.category, 1))
    {
        return response(res, null, "invalid vehicle category", 422);
    }
    req.body.created = moment.utc().format();
    vehicleCategoryService.createVehicleCategory(req.body).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
     }
     // created!
     return  response(res, data,  "vehicle category created", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
