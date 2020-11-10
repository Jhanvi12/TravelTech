'use strict';
var model = require('../../model');
var User= model.Users; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var Enum = require('enum');
var modulesEnum = new Enum(config.seeds.modules);
module.exports = function(req, res){

    // fetching user by its id    
    User.findById(req.params.id).then(function(data){ 
      if(!data){
        return response(res, null,  "No record found", 204);
      } 
      var permissions = data.permissions;     
      permissions.forEach(function(item) {
        item.name = modulesEnum.get(item.module).key;
      });      
      return  response(res, permissions,  "User records fetched", 200);
    }).catch(function(err){
      return  response(res, null,  err.message, 500);
    });
  };