'use strict';
var model = require('../../model');
var City = model.City; // require City model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var feedbackService = require('./service');
var Q = require('q');
module.exports = function(req, res){
    var inputData = req.body;
    var arr = [];
    inputData.forEach(function(val){
        arr.push(feedbackService.deleteFeedbackById(val._id));
    });
    Q.all(arr).then(function(data){
        return response(res, null,  "deleted successfully", 200);
    }).catch(function(err){
        return response(res, null,  err.message, 500);
    });
};
