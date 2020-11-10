'use strict';
var model = require('../../model');
var Coupon = model.Coupon; // require coupon model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var couponService = require('./service');
module.exports = function(req, res) {
    //validation for coupon code exists
    if (!validator.isLength(req.body.code, 1))
    {
        return response(res, null, "invalid coupon code", 422);
    }
    //validation for type exists
    if (!validator.isLength(req.body.type, 1))
    {
        return response(res, null, "invalid type", 422);
    }
    //validation for discount amount exists
    if (!validator.isNumeric(req.body.discount, 1))
    {
        return response(res, null, "invalid discount amount", 422);
    }
    var jsonData = req.body;
    // create new coupon if not already added
    couponService.getCouponByCode(jsonData.code).then(function(data) {
        if (data) {
            return response(res, null, "Coupon code already exists.", 409);
        }
        else {
            return couponService.createCoupon(jsonData);
        }
    }).then(function(data) {
        if (!data) {
            return response(res, null, "Failed", 500);
        }
        return response(res, data, "Coupon created successfully", 200);

    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
};