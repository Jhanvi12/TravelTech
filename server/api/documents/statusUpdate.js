'use strict';
var model = require('../../model');
var Document= model.Documents; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var notify = require('../../components/notification');
var User = model.Users; // require User model
var validator = require('validator'); // require for put server side validations
var config = require('config');
var userService = require('./service');
var Enum = require('enum');
var documentEnum = new Enum(config.seeds.document_status);

module.exports = function(req, res){
  var outputJSON = "";
  var errorCount =0;
  var inputData = req.body;
  for(var attributename in inputData){
    var  id = inputData[attributename]._id;
    Document.findById(id, function(err, data) {
     if(err) {
      errorCount++;
    }
    else { 
      if(inputData[attributename].is_deleted){
        data.is_deleted = inputData[attributename].is_deleted;
      }else{
        if(inputData[attributename].status=='decline'){
          data.decline_comment = inputData[attributename].decline_comment;          
          notify.sendNotification("", data.operator, data.decline_comment);
        }        
        data.status = documentEnum.get(inputData[attributename].status).value;             
      } 
      
      data.save(function(err, data) {
       if(err) {
        errorCount++;
      }
    });
    }
  });
  }
  if(errorCount > 0) {
    outputJSON = {'status': 'success', 'messageId':402, 'message':'Failed'};
  }
  else {
    outputJSON = {'status': 'success', 'messageId':200, 'message':'Success'};
  }
  res.jsonp(outputJSON);
};