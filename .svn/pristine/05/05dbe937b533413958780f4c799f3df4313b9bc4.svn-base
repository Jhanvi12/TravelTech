'use strict';
var model = require('../../model');
var User= model.User; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var userService = require('./service');
module.exports = function(req, res){

    // fetching user by its id
    userService.getUserById(req.params.id).then(function(data){
      if(!data){
        return response(res, null,  "No record found", 204);
      }
       if(data.bank_info.cheque !== undefined){
        data.bank_info.cheque = config.server.baseurl + config.upload.images.main + data.bank_info.cheque;
       }
       console.log('data', data) ;
        if(data.operator_info.id_proof !== undefined){
       data.operator_info.id_proof = config.server.baseurl + config.upload.images.main + data.operator_info.id_proof;
       } 
       if(data.operator_info.id_proof_company !== undefined){
       data.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + data.operator_info.id_proof_company;
       } 
        return  response(res, data,  "User records fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
};
