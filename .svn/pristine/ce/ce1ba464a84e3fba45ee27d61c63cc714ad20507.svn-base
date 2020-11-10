'use strict';
var response = require('../../components/response');
var validator = require('validator');
var config = require('config');
var feedbackService = require('./service.js');
var Q = require('q');
module.exports = function(req, res){

	feedbackService.getFeedbackByRideId(req.params.id).then(function(data){
		console.log(data)
		return  response(res, data,  "reviews fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
