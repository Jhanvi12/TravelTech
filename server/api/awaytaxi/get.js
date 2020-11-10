'use strict';
var model = require('../../model');
var Awaytaxi = model.AwayTaxi; 
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var awaytaxiService = require('./service');

module.exports = function(req, res){

	awaytaxiService.getawayTaxiById(req.params.id).then(function(data){
		if(!data){
			return response(res, null,  "no content", 204);
		}        
		return  response(res, data,  "AwayTaxi fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
