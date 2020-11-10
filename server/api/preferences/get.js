'use strict';
var model = require('../../model');
var Preference = model.Preferences; // require preference model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var preferenceService = require('./service');
module.exports = function(req, res){

	preferenceService.getPreference().then(function(data){
		if(!data){
			return response(res, null,  "no content", 204);
		}        
		return  response(res, data,  "Preference fetched", 200);
	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};
