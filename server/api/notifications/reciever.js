'use strict';
var model = require('../../model');
var Notification = model.Notifications; 
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var notificationService = require('./service');
var Q = require('q');
module.exports = function(req, res){
     var is_read;
  /*If sending id and query parameters*/
    if (req.query.status == "read") {
        is_read = true;
        notificationService.getNotificationByRecieverId(req.params.id,is_read).then(function(data){
        if(!data){
            return response(res, null,  "no content", 204);
        }        
        return  response(res, data,  "notifications fetched", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
    }else if (req.query.status == "unread") {
        is_read = false;
        notificationService.getNotificationByRecieverId(req.params.id,is_read).then(function(data){
        if(!data){
            return response(res, null,  "no content", 204);
        }        
        return  response(res, data,  "notifications fetched", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
    }
    /*If sending only id*/
    else {
        
         notificationService.getNotificationsByRecieverId(req.params.id).then(function(data){
         if(!data){
            return response(res, null,  "no content", 204);
         }        
        return  response(res, data,  "notifications fetched", 200);
         }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });

    }
    
     
};
