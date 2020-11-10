'use strict';
var model = require('../../model');
var Notification = model.Notifications; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var notificationService = require('./service');

module.exports = function(req, res) {
    var outputJSON = "";
    var errorCount = 0;
    var inputData = req.body;
    for (var attributename in inputData) {
        var id = inputData[attributename]._id;
        Notification.findById(id, function(err, data) {
            if (err) {
                errorCount++;
            }
            else {
                data.is_read = inputData[attributename].is_read;
                data.save(function(err, data) {
                    if (err) {
                        errorCount++;
                    }
                });
            }
        });
    }
    if (errorCount > 0) {
        outputJSON = {'status': 'success', 'messageId': 402, 'message': 'Failed'};
    }
    else {
        outputJSON = {'status': 'success', 'messageId': 200, 'message': 'Success'};
    }
    res.jsonp(outputJSON);
};