'use strict';
var model = require('../../model');
var City = model.City; // require city model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var InventoryService = require('./service');
module.exports = function(req, res){
    
	InventoryService.getInventoryByoperatorId(req.params.id).then(function(data){
		console.log(JSON.stringify(data[0].ride_id));
		if(!data){
			return response(res, null,  "no content", 204);
		}        
		return  response(res, data,  "Inventory fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
