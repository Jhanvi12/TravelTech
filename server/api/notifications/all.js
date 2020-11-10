'use strict';
var model = require('../../model');
var Notification = model.Notifications; // require Notification model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var notificationService = require('./service');
var Q = require('q');
module.exports = function(req, res) {
    var query = {};
    var offset = 0;
    var name ;
    query.is_deleted = false;
    var limit = 10;
    if (!req.query.all) {
        query.user = req.query.user;
    }
    if (req.query.status == "read") {
        query.is_read = 1;
    } else if (req.query.status == "unread") {
        query.is_read = 0;
    }
     if(req.query.name && req.query.name != 'undefined'){
    query.$or = [
    { 'receiver_name' : new RegExp('^'+req.query.name, "i") }
    ];
    console.log(query);
  }
  console.log(query);
    Q.all([notificationService.getNotifications(query, req.query.offset, limit), notificationService.getCount(query)]).then(function(result) {
        var data = {};
        data.count = result[1];
        data.data = result[0];
        return  response(res, data, "Notification records fetched", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });

};