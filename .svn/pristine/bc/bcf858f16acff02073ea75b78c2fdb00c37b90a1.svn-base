'use strict';
var model = require('../../model');
var Module = model.Module; // require module model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moduleService = require('./service');
module.exports = function(req, res){

    moduleService.deleteModuleById(req.params.id).then(function(){
        return response(res, null,  "module deleted", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
