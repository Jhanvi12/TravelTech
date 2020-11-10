  'use strict';
  var response = require('../../components/response'); // require response js for setting headers variables
  var validator = require('validator'); // require for put server side validations
  var moment=require('moment');
  var Q = require('q');
  var model = require('../../model');
  var config = require('config');
  var Review  = model.Reviews;
  var driver = model.Drivers; 
  var vehicle = model.Vehicles; 
  var ratingService = require('./service');
  var expressJwt = require('express-jwt');
  var jwt = require('jsonwebtoken');
  var _=require('underscore');

  module.exports = function(req,res){
  ratingService.getReviewsOfAllOperator().then(function(result){
  console.log('The result is',result);
  return  response(res, result,  "Reviews of all operator fetched", 200);
  }).catch(function(err){
  return  response(res, null,  "Error in fetching", 500);
  });
  };