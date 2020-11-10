'use strict';
var model = require('../../model');
var VehicleCategory = model.VehicleCategory; // require Vehicle Category model
var response = require('../../components/response')
var vehicleCategoryService = require('./service');
module.exports = function(req, res){

    vehicleCategoryService.getVehicleCategoryById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      }
        return  response(res, data,  "role fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
