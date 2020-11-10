'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleCategoryService = require('./service.js');
module.exports = function(req, res){
    var query = {};
    query.is_deleted = false;
    if(req.query.category && req.query.category != 'undefined'){
        query.$or = [
            { 'category' : new RegExp('^'+req.query.category, "i") }
        ];
    }
   vehicleCategoryService.getVehicleCategories(query).then(function(data){
    if(!data){
      return response(res, null,  "no content", 204);
    }
      return  response(res, data,  "vehicle category fetched", 200);
  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};