'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
// data travvelling object
var documentDto = require('../../dto/document');
var documentService = require('./service.js');
module.exports = function(req, res){

   documentService.getDocumentById(req.params.id).then(function(data){
    if(!data){
      return response(res, null,  "no content", 204);
    }
    // Fetched!
    var result = driverDto.marshal(data);
      return  response(res, result,  "document's information fetched", 200);
  }).catch(function(err){
    return  response(res, null,  err.message, 500);
  });

};
