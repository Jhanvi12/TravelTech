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

    moduleService.getModuleById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "no content", 204);
      }
        var result = moduleDto.marshal(data);
        return  response(res, result,  "module fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
