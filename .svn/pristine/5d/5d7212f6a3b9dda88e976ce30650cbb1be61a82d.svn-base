'use strict';
var model = require('../../model');
var DefaultVehicles = model.DefaultVehicles; // require Vehicle Category model
var response = require('../../components/response')
var defaultVehicleService = require('./service');
module.exports = function(req, res) {

    defaultVehicleService.getDefaultVehicles(req.params.id).then(function(data) {
        if (!data) {
            return response(res, null, "no content", 204);
        }
        return  response(res, data, "default vehicles fetched", 200);
    }).catch(function(err) {
        return  response(res, null, err.message, 500);
    });
};
