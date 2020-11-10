'use strict';
var models = require('../model');
var User = models.Users;
var mail = require('./email');
var sms = require('./sms');
var notificationService = require('./../api/notifications/service');
var moment = require('moment');
module.exports = {
    /**
     * @sendNotification
     * this function is used for sending notification to user via email or sms.
     * @param user | Object | it is an object that contains user's information like email and phone number
     * @param description | String | it is description of the notification
     **/
    sendNotification: function(sender, receiver, description) {
        if (sender) {
            var jsonData = {"sender": sender, "receiver": receiver, "description": description};
        } else {
            var jsonData = {"receiver": receiver, "description": description};
        }
        // create new Notification
        return notificationService.createNotification(jsonData).then(function(data) {
            if (!data) {
                return response(res, null, "Failed", 500);
            }
            // created!
            return  true;
        }).catch(function(err) {
            return false;
        });
    },
};