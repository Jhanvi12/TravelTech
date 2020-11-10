'use strict';
var model = require('../../model');
var VehicleCategory = model.VehicleCategory; // require Vehicle Category model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var vehicleCategoryService = require('./service');
module.exports = function(req, res){
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  if(req.body.category){
    //validation for vehicle category exists
    if(!validator.isLength(req.body.category, 1))
    {
        return response(res, null, "invalid vehicle category", 422);
    }else{
      updateQuery.category = req.body.category;
    }
  }

  updateQuery.modified =  moment.utc().format();

    vehicleCategoryService.updateVehicleCategoryById(req.params.id, updateQuery).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
     }
     // updated!
     return  response(res, data,  "vehicle category updated", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
