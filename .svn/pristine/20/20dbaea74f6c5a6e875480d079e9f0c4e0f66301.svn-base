'use strict';
var model = require('../../model');
var Coupon = model.Coupons; // require coupon model
module.exports = {
    /**
     *get count coupons list
     **/

    getCount: function(query) {
        if (!query) {
            return Coupon.find().count();
        } else {
            return Coupon.find(query).count();
        }
    },
    /**
     *get cities list
     **/

    getCoupons: function(query, offset, limit) {
        if (!query) {
            return Coupon.find().skip(offset).limit(limit);
        } else {
            return Coupon.find(query).skip(offset).limit(limit);
        }
    },
    /**
     *get Coupon by its id
     *@param | Id | object id of Coupon
     **/

    getCouponById: function(id) {
        // fetching Coupon by its id
        return  Coupon.findOne({"_id": id, "is_deleted": false}).exec();
    },
    /**
     *get Coupon by its state name
     *@param | state | state name
     **/

    getCouponByCode: function(code) {
        // fetching Coupon by its code
        return Coupon.findOne({"code": code, "is_deleted": false}).exec();
    },
    /**
     *get Coupon by its id
     *@param | id 		  | objectId | object id of Coupon
     *@param | updateQuery | object   | object contains parameter which has to be update
     **/
    updateCouponById: function(id, updateQuery) {
        // updating new Coupon
        return Coupon.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
    },
    /**
     *get Coupon by its id
     *@param | params | object | contains parameters for creating new Coupon
     **/
    createCoupon: function(params) {
        // creating new Coupon
        return Coupon.create(params);
    },
    /**
     *get Coupon by its id
     *@param | Id | object id of Coupon
     **/
    deleteCouponById: function(id) {
        return Coupon.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
    }
}