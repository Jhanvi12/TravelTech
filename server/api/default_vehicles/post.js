'use strict';
var model = require('../../model');
var DefaultVehicles = model.DefaultVehicles; // require Vehicle Category model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var defaultVehicleService = require('./service');
var moment = require('moment');
module.exports = function(req, res) {
    //validation for vehicle category name exists
    if (!validator.isLength(req.body.category, 1))
    {
        return response(res, null, "invalid vehicle category", 422);
    }

    if (!validator.isLength(req.body.type, 1))
    {
        return response(res, null, "invalid vehicle type", 422);
    }

    if (!validator.isNumeric(req.body.capacity, 1))
    {
        return response(res, null, "invalid vehicle capacity", 422);
    }
    req.body.created = moment.utc().format();
    defaultVehicleService.createDefaultVehicle(req.body).then(function(data) {
        if (!data) {
            return response(res, null, "Failed", 500);
        }
        // created!
        return  response(res, data, "default vehicle created", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
};
