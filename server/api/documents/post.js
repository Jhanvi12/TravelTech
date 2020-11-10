'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var documentService = require('./service');
var documentDto = require('../../dto/document');
var fs = require('fs');
module.exports = function(req, res){
  var documentname = null;
     if(req.files.document){
      var picture = req.files.document[0];
      if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
        return response(res, null, "invalid image type", 422);
      }else{
        var ext = "";
        if(picture.mimetype == 'image/jpeg'){
          ext = ".jpg";
        }else{
          ext = ".png";
        }
        documentname = picture.filename + ext;
      }
    }
    //validation for checking document related with
    if(!validator.isMongoId(req.body.driver) && !validator.isMongoId(req.body.vehicle))
    {
        return response(res, null, "incomplete information", 422);
    }
    //validation for User name
    if(!validator.isLength(req.body.type, 1))
    {
        return response(res, null, "invalid type", 422);
    }

    documentService.createDocument(documentDto.unmarshal(req.body, documentname, req.user.uid)).then(function(data){
     if(!data){
       return response(res, null, "Failed", 500);
     }
     if(req.files){
       if(req.files.document){
         var source = config.upload.images.temp + req.files.document[0].filename;
         var path = config.upload.images.main + documentname;
         fs.rename(source, path, function(err){
            if(err){ throw err; }
          });
       }
     }
     var result = documentDto.marshal(data);
     return  response(res, result,  "document's information added", 200);
   }).catch(function(err){

       console.log(err)

     return  response(res, null,  err.message, 500);
   });
};
