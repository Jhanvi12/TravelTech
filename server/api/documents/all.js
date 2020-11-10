'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config'); // data travvelling object
var documentDto = require('../../dto/document');
var documentService = require('./service.js');
module.exports = function(req, res){
    var query = {};
    query.is_deleted = false;
    if(req.query.vehicle){
        query.vehicle = req.query.vehicle;
    }
    if(req.query.driver){
        query.driver = req.query.driver;
    }
    if(!req.query.driver && !req.query.vehicle){
        query.operator = req.query.operator ? req.query.operator : req.user.uid;
    }
    documentService.getDocumentslist(query).then(function(data){
        if(!data){
            return response(res, null,  "no content", 204);
        }
        // Fetched!
        var arr = [];
        data.forEach(function(val){
            arr.push(documentDto.marshal(val));
        });
        return  response(res, arr,  "document's information fetched", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });

};
