'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');

var couponService = require('./service.js');
var Q = require('q');
module.exports = function(req, res) {
    var query = {};
    query.is_deleted = false;
    if (req.query.code && req.query.code != 'undefined') {
        query.code = new RegExp('^' + req.query.code, "i");
    }
    var limit = 10;
    Q.all([couponService.getCoupons(query, req.query.offset, limit), couponService.getCount(query)]).then(function(result) {
        var data = {};
        data.count = result[1];
        data.data = result[0];
        return response(res, data, "Coupon records fetched", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
};
