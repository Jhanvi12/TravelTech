'use strict';
var model = require('../../model');
var Bid = model.Bid; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var bidService = require('./service');

module.exports = function(req, res){
    
	bidService.getbidsbyId(req.params.id).then(function(data){
		console.log('req.params.id',req.params.id);
		if(!data){
			return response(res, null,  "no content", 204);
		}        
		return  response(res, data,  "Bids fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
