'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var bidService = require('./service.js');
var Q = require('q');
var config = require('config');
var Enum = require('enum');
var moment = require('moment');
var bidStatusEnum = new Enum(config.seeds.bid_status);
var rideStatusEnum = new Enum(config.seeds.ride_status);
var _ = require('lodash');
var preferenceService = require('../preferences/service.js');
module.exports = function(req, res) {
    var limit = 10;
    var query = {};
    console.log('query', query);
    if (!req.query.all) {
        query.operator = req.query.operator ? req.query.operator : req.user.uid;
    }
    if (req.query.ride) {
        query.ride = req.query.ride;
    }
    if (req.query.ratetype) {
        query.bid_rate_type = req.query.ratetype;
    }
    if (req.query.status) {
        query.bid_status = bidStatusEnum.get(req.query.status).value;
    }
    query.is_deleted = false;
    if (req.query.type) {
        var calculatedDate = moment().utc();
        preferenceService.getPreference().then(function(data) {

            calculatedDate.hour(calculatedDate.hour() - data.bidding_time_limit);
            // query["ride.created"]= {$gt: calculatedDate.format()};
            return bidService.getBids(query);
        }).then(function(result) {
            if (!result || !result.length) {
                return response(res, null, "no content", 204);
            }
            var data_res = [];
            if (req.query.type == 'open') {
                data_res = _.remove(result, function(o) {
                    return moment(o.ride.created).utc().format() < calculatedDate.format();
                });
            } else {
                data_res = _.remove(result, function(o) {
                    return moment(o.ride.created).utc().format() > calculatedDate.format();
                });
            }
            // Fetched bid data!
            return  response(res, result, "bid fetched", 200);
        }).catch(function(err) {
            console.log(err);
        })
    } else if (req.query.ridetype) {
        query.bid_status = bidStatusEnum.get('approved').value

        bidService.getBids(query).then(function(data) {
            if (!data || !data.length) {
                return response(res, null, "no content", 204);
            }
            var data_res = [];
            if (req.query.ridetype) {
                data_res = _.remove(data, function(o) {
                    return o.ride.status != rideStatusEnum.get(req.query.ridetype).value
                });
            }
            // Fetched bid data!
            return  response(res, data, "bid fetched", 200);
        }).catch(function(err) {
            return  response(res, null, err.message, 500);
        });
    } else {

        Q.all([bidService.getBids(query, req.query.offset, limit), bidService.getCount(query)]).then(function(result) {
            if (!result[0] || !result[0].length) {
                return response(res, null, "no content", 204);
            }
            var data = {};
            console.log('data', result);
            data.count = result[1];
            data.data = result[0];
            // Fetched ride data!
            return  response(res, data, "bids fetched", 200);
        }).catch(function(err) {
            return  response(res, null, err.message, 500);
        });
    }
};
