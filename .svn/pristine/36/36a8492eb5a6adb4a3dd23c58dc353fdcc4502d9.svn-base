'use strict';
var model = require('../../model');
var Notification = model.Notifications; // require notification model
module.exports = {
    /**
     *get count notifications list
     **/

    getCount: function(query) {
        if (!query) {
            return Notification.find().count();
        } else {
            return Notification.find(query).count();
        }
    },
    /**
     *get Notifications list
     **/

    getNotifications: function(query, offset, limit) {
        if (!query) {
            return Notification.find(query).skip(offset).limit(limit).populate('sender').populate('receiver').exec();
        } else {
            return Notification.find(query).skip(offset).limit(limit).populate('sender').populate('receiver').exec();

        }
    },
    /**
     *get Notification by its id
     *@param | Id | object id of Notification
     **/

    getNotificationById: function(id) {
        // fetching Notification by its id
        return  Notification.findOne({"_id": id, "is_deleted": false}).exec();
    },
    /**
     *get Notification by its id
     *@param | params | object | contains parameters for creating new Notification
     **/
    createNotification: function(params) {
        // creating new Notification
        return Notification.create(params);
    },
    /**
     *get Notification by its id
     *@param | Id | object id of Notification
     **/
    deleteNotificationById: function(id) {
        return Notification.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
    },
    /*Get all notifications of the reciever id*/
    getNotificationByRecieverId: function(id,query) {
        return  Notification.find({"receiver": id,"is_read":query,"is_deleted": false}).exec();
    },
     getNotificationsByRecieverId: function(id) {
        return  Notification.find({"receiver": id,"is_deleted": false}).exec();
    }
}