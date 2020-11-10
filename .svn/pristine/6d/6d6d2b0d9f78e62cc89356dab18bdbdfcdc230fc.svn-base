'use strict';
var model = require('../../model');
var Notification = model.Notifications; // require city model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var notificationService = require('./service');
module.exports = function(req, res){
notificationService.getNotificationById(req.params.id).then(function(result){
		if(!result){
			return response(res, null,  "no content", 204);
		}        
		// return  response(res, result,  "city fetched", 200);
		var jsonData =  result ;
		console.log('jsonData', jsonData.receiver_name)
		var passData = {};
		passData.receiver_name = jsonData.receiver_name;
		passData.receiver = jsonData.receiver;
		passData.description = jsonData.description;
		console.log('passData', passData);
		notificationService.createNotification(passData).then(function(data) {
			console.log("inside Create notification");
        if (!data) {
            return response(res, null, "Failed", 500);
        }
        // created!
        return  response(res, data, "notification created", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });

	}).catch(function(err){
		return  response(res, null,  err.message, 500);
	});
};


