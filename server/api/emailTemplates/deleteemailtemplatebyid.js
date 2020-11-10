'use strict';
var model = require('../../model');
var emailTemplate= model.emailTemplate; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var emailTemplateService = require('./service');
module.exports = function(req, res){
    var id = req.params.id;
    emailTemplateService.deleteemailtemplatebyid(id).then(function(data){
      if(!data){
        return response(res, null,  "No record found", 204);
      }
        return  response(res, data,  "User records fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
