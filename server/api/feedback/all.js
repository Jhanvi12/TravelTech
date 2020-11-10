'use strict';
var response = require('../../components/response');
var validator = require('validator');
var config = require('config');
var feedbackService = require('./service.js');
var Q = require('q');
module.exports = function(req, res) {
    var query = {};
    query.is_deleted = false;
    var limit = 10;
    // if (req.query.reviewer_name && req.query.reviewer_name != 'undefined') {
    //     query.reviewer_name = new RegExp('^' + req.query.reviewer, "i");
    // }
     if(req.query.name && req.query.name != 'undefined'){
    query.$or = [
    { 'reviewer_name' : new RegExp('^'+req.query.name, "i") }
    ];
    console.log(query);
}
    Q.all([feedbackService.getFeedback(query, req.query.offset, limit), feedbackService.getCount(query)]).then(function(result) {
        console.log('result', result)
        var data = {};
        data.count = result[1];
        data.data = result[0];
        return  response(res, data, "Reviews records fetched", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
};
