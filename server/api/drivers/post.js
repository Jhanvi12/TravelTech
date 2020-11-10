'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var driverService = require('./service');
var driverDto = require('../../dto/driver');
var documentDto = require('../../dto/document');
var documentService = require('../documents/service.js');
var userService = require('../users/service');
var notificationService = require('../notifications/service');
var fs = require('fs');
var Q = require('q');
module.exports = function(req, res){
  var picturename = null;
  var dl = null;
  var verification = null;
     if(req.files.profile_pic){
      var picture = req.files.profile_pic[0];
      if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
        return response(res, null, "invalid image type", 422);
      }else{
        var ext = "";
        if(picture.mimetype == 'image/jpeg'){
          ext = ".jpg";
        }else{
          ext = ".png";
        }
        picturename = picture.filename + ext;
      }
    }
    if(req.files.dl){
      req.files.dl.forEach(function(val){
        var picture = val;
        if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
          return response(res, null, "invalid image type", 422);
        }else{
          var ext = "";
          if(picture.mimetype == 'image/jpeg'){
            ext = ".jpg";
          }else{
            ext = ".png";
          }
          dl = picture.filename + ext;
        }
      });
    }
    if(req.files.verification){
      req.files.verification.forEach(function(val){
        var picture = val;
        if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
          return response(res, null, "invalid image type", 422);
        }else{
          var ext = "";
          if(picture.mimetype == 'image/jpeg'){
            ext = ".jpg";
          }else{
            ext = ".png";
          }
          verification = picture.filename + ext;
        }
      });
    }
    //validation for User name
    if(!validator.isLength(req.body.name, 1))
    {
        return response(res, null, "invalid name", 422);
    }
    //validation for firstname phone_number
    if(!validator.isNumeric(req.body.phone_number, 10))
    {
        return response(res, null, "invalid phone_number", 422);
    }
    var uid = req.body.operator;
    req.body.receiver = uid;
    req.body.description = "You added a Driver";
      userService.getUserById(req.body.receiver).then(function(data){
    console.log("The name is",data.name);
     req.body.receiver_name = data.name;
    driverService.createDriver(driverDto.unmarshal(req.body, picturename, uid)).then(function(data){
        if(!data){
          return response(res, null, "Failed", 500);
        }
        var arr = [];
        if(req.files){
          if(req.files.profile_pic){
            var source = config.upload.images.temp + req.files.profile_pic[0].filename;
            var path = config.upload.images.main + picturename;
            fs.rename(source, path, function(err){
               if(err){ throw err; }
            });
          }
           if(req.files.dl){
               var dlJson ={};
               dlJson.driver = data._id;
               dlJson.type = 'dl';
               arr.push(documentService.createDocument(documentDto.unmarshal(dlJson, dl, uid)))
           }
           if(req.files.verification){
               var verifyJson ={};
               verifyJson.driver = data._id;
               verifyJson.type = 'driver_verification';
               arr.push(documentService.createDocument(documentDto.unmarshal(verifyJson, verification, uid)))
           }
       }
        notificationService.createNotification(req.body).then(function(data) {
                        console.log("notifcation send");
                    })
         return Q.all(arr);
   }).then(function(result){
       if(req.files){
         if(req.files.dl){
           var source = config.upload.images.temp + req.files.dl[0].filename;
           var path = config.upload.images.main + dl;
           fs.rename(source, path, function(err){
              if(err){ throw err; }
           });
         }
         if(req.files.verification){
           var source = config.upload.images.temp + req.files.verification[0].filename;
           var path = config.upload.images.main + verification;
           fs.rename(source, path, function(err){
              if(err){ throw err; }
           });
         }
     }
       return  response(res, null,  "driver's information added", 200);
   }).catch(function(err){
       console.log(err)
       return  response(res, null,  err.message, 500);
   });
 });
};
