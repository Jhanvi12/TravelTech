'use strict';
var model = require('../../model');
var Module = model.Module; // require module model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
// data travvelling object of module
var moduleDto = require('../../dto/module');
var moduleService = require('./service');
module.exports = function(req, res){
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  if(req.body.module_name){
    //validation for module name exists
    if(!validator.isLength(req.body.module_name, 1))
    {
        return response(res, null, "invalid module name", 422);
    }else{
      updateQuery.module_name = req.body.module_name;
    }
  }
  if(req.body.module_description){
    //validation for module description exists
    if(!validator.isLength(req.body.module_description, 1))
    {
        return response(res, null, "invalid module description", 422);
    }else{
      updateQuery.module_description = req.body.module_description;
    }
  }
  if(req.body.module_status){
    //validation for module status
   if(!validator.isLength(req.body.module_status, 1))
   {
       return response(res, null, "invalid module status", 422);
   }else{
     updateQuery.module_status = req.body.module_status;
   }
  }

  updateQuery.modified =  moment.utc().format();

    moduleService.updateModuleById(req.params.id, updateQuery).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
     }
     // updated!
     var result = moduleDto.marshal(data);
     return  response(res, result,  "module updated", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
