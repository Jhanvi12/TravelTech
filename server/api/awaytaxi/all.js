'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');

var InventoryService = require('./service.js');
var Q = require('q');
module.exports = function(req, res){
    var query = {};
    query.is_deleted = false;
    if(req.query.guest_name && req.query.guest_name != 'undefined'){
        query.$or = [
        
        { 'guest_name' : new RegExp('^'+req.query.guest_name, "i") },
        { 'guest_phone_number' : new RegExp('^'+req.query.guest_name, "i") },
        { 'guest_guest_email' : new RegExp('^'+req.query.guest_name, "i") }
        ];
    }
    var limit = 10;
    Q.all([InventoryService.getInventory(query, req.query.offset, limit), InventoryService.getCount(query)]).then(function(result){
        var data = {};
        data.count = result[1];
        data.data = result[0];
        return  response(res, data,  "City records fetched", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};