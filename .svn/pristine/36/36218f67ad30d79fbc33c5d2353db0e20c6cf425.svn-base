'use strict';
var model = require('../../model');
var Inventory = model.Inventories; // require City model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var InventoryService = require('./service');
var Q = require('q');
module.exports = function(req, res){
    var inputData = req.params.id;
    console.log('the data isss',inputData);
   /* var arr = [];
    inputData.forEach(function(val){
        arr.push(cityService.deleteInventoryById(val._id));
    });*/
  /*  Q.all(inputData).then(function(data){
        console.log(data);
        return response(res, null,  "deleted successfully", 200);
    }).catch(function(err){
        return response(res, null,  err.message, 500);
    });*/
/*This function is deleting the inventories by its _id*/
InventoryService.deleteInventoryById(inputData).then(function(data){
        return response(res, null,  "deleted successfully", 200);
    }).catch(function(err){
        return response(res, null,  err.message, 500);
    });
};

