'use strict';
var model = require('../../model');
var Module = model.Module; // require module model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
// data travvelling object of module
var moduleDto = require('../../dto/module');
var moduleService = require('./service');
module.exports = function(req, res){
    //validation for module name exists
    if(!validator.isLength(req.body.module_name, 1))
    {
        return response(res, null, "invalid module name", 422);
    }
    //validation for module description exists
    if(!validator.isLength(req.body.module_description, 1))
    {
        return response(res, null, "invalid module description", 422);
    }

    moduleService.createModule(moduleDto.unmarshal(req.body)).then(function(data){
     if(!data){
       return response(res, null,  "Failed", 500);
     }
     // created!
     var result = moduleDto.marshal(data);
     return  response(res, result,  "module created", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
