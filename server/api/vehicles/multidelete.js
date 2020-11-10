'use strict';
var model = require('../../model');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var Q = require('q');
module.exports = function(req, res){
	var inputData = req.body;
	var arr = [];
	inputData.forEach(function(val){
		arr.push(vehicleService.deleteVehicleById(val._id));
	});
	Q.all(arr).then(function(data){
		return response(res, null,  "deleted successfully", 200);
	}).catch(function(err){
		return response(res, null,  err.message, 500);
	});
};
