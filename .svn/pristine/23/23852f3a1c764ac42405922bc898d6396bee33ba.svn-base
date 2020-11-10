'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
// data travvelling object of role
var driverDto = require('../../dto/driver');
var driverService = require('./service.js');
var Q = require('q');
module.exports = function(req, res){
  var query = {};
  query.is_deleted = false;
  if(req.query.name && req.query.name != 'undefined'){
    query.$or = [
    { 'name' : new RegExp('^'+req.query.name, "i") },
    { 'name.last' : new RegExp('^'+req.query.name, "i") }
    ];
  }console.log(query);
  if(!req.query.all){
    query.operator = req.query.operator ? req.query.operator : req.user.uid;
  }
  if(req.query.approved){
      query.is_approved = true;
  }
  var limit = 10;
  Q.all([driverService.getdriverslist(query, req.query.offset, limit), driverService.getCount(query)]).then(function(result){
    if(!result){
      return response(res, null,  "no content", 204);
    }
    //Fetched!
    var arr = [];
    result[0].forEach(function(val){
     arr.push(driverDto.marshal(val));
   });
    var data = {};
    data.count = result[1];
    data.data = arr;

    return  response(res, data,  "driver's information fetched", 200);

  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};
