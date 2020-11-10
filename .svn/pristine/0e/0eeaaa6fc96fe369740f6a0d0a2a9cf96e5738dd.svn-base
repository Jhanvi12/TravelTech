'use strict';
var model = require('../../model');
var State = model.State; // require city model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var stateService = require('./service');
module.exports = function(req, res){

	stateService.getCityById(req.params.id).then(function(data){
		if(!data){
			return response(res, null,  "no content", 204);
		}        
		return  response(res, data,  "city fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
