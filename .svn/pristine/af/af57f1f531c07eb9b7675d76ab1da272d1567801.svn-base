'use strict';
var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var driverService = require('./service');
var driverDto = require('../../dto/driver');
var fs = require('fs');
var _ = require('lodash');
var passwordHash = require('password-hash');
var documentDto = require('../../dto/document');
var documentService = require('../documents/service.js');
var Q = require('q');
module.exports = function(req, res){
    var picturename = null;
    var dl = null;
    var verification = null;
    // updateQuery is a object that store fields that has to be update
    var updateQuery = {};
    updateQuery.name = {};
    // checking firstname
    if(req.body.first){
        //validation for firstname exists
        if(!validator.isLength(req.body.first, 1))
        {
            return response(res, null, "invalid firstname", 422);
        }else{
            updateQuery.name = req.body.first;
        }
    }
    //checking phone number
    if(req.body.phone_number)
    {
        //validation for User's phone no.
        if(!validator.isNumeric(req.body.phone_number))
        {
            return response(res, null, "invalid phone numbers", 422);
        }else{
            updateQuery.phone_number = req.body.phone_number;
        }
    }
    //checking activation and de-activation of account
    if(req.body.is_active)
    {
        //validation for User's phone no.
        if(!validator.isBoolean(req.body.is_active))
        {
            return response(res, null, "invalid is active", 422);
        }else{
            updateQuery.is_active = req.body.is_active;
        }
    }
    //checking attachments
    if(req.files)
    {
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
                updateQuery.profile_pic = picturename;
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
    }
    var driverData = null;
    updateQuery.modified =  moment.utc().format();
    driverService.updateDriverById(req.params.id, updateQuery).then(function(data){
        driverData = data;
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
                arr.push(documentService.createDocument(documentDto.unmarshal(dlJson, dl, req.user.uid)))
            }
            if(req.files.verification){
                var verifyJson ={};
                verifyJson.driver = data._id;
                verifyJson.type = 'driver_verification';
                arr.push(documentService.createDocument(documentDto.unmarshal(verifyJson, verification, req.user.uid)))
            }
        }
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
        return  response(res, driverData,  "driver's information updated", 200);
    }).catch(function(err){
        console.log(err)
        return  response(res, null,  err.message, 500);
    });
};
