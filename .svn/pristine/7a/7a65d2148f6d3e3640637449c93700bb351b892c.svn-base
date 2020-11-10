'use strict';
var model = require('../../model');
var User= model.User;
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var userService = require('./service');
var Q = require('q');
var documentService = require('../documents/service.js');
module.exports = function(req, res){

	userService.deleteUserById(req.params.id).then(function(data){
		return response(res, null,  "deleted successfully", 200);
	}).catch(function(err){
		return response(res, null,  err.message, 500);
	});
};
