'use strict';
var model = require('../../model');
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var Q = require('q');
var documentService = require('../documents/service.js');
module.exports = function(req, res){

	vehicleService.deleteVehicleById(req.params.id).then(function(data){
		return response(res, null,  "deleted successfully", 200);
	}).catch(function(err){
		return response(res, null,  err.message, 500);
	});
};
