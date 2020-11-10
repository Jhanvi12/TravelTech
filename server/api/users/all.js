'use strict';
var model = require('../../model');
var User = model.User; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var config = require('config');
var userService = require('./service');
var Q = require('q');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
module.exports = function(req, res){
  var query = {};
  query.is_deleted = false;
  if(req.query.name && req.query.name != 'undefined'){
    query.$or = [
      { 'name' : new RegExp('^'+req.query.name, "i") },
      { 'job_title' : new RegExp('^'+req.query.name, "i") },
      { 'department' : new RegExp('^'+req.query.name, "i") },
      { 'address.city' : new RegExp('^'+req.query.name, "i") }
    ];
  }
  if(req.query.type){
    query.role = userRoleEnum.get(req.query.type).value;
  }
  var limit = 10;
  console.log(query,req.query.name1, req.query.offset, limit);
  Q.all([userService.getUsers(query,req.query.name1, req.query.offset, limit), userService.getCount(query)]).then(function(result){
    var data = {};
    data.count = result[1];
    data.data = result[0];

    return  response(res, data,  "User records fetched", 200);
  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });
};
