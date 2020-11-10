'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var vehicleService = require('./service');
var userService = require('../users/service');
var vehicleDto = require('../../dto/vehicle');
var documentDto = require('../../dto/document');
var documentService = require('../documents/service.js');
var notificationService = require('../notifications/service');
var fs = require('fs');
var Q = require('q');
module.exports = function(req, res){
    var picturename = [];
    var vehicle_rc = null;
    var vehicle_permit = null;
    if(req.files.images){
        req.files.images.forEach(function(val){
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
                picturename.push(picture.filename + ext);
            }
        });
    }
    if(req.files.rc){
        req.files.rc.forEach(function(val){
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
                vehicle_rc = picture.filename + ext;
            }
        });
    }
    if(req.files.permit){
        req.files.permit.forEach(function(val){
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
                vehicle_permit = picture.filename + ext;
            }
        });
    }

    //validation for vehicle number
    if(!validator.isLength(req.body.registration_number, 1))
    {
        return response(res, null, "invalid regisration number", 422);
    }
    //validation for vehicle type
    if(!validator.isLength(req.body.type, 1))
    {
        return response(res, null, "invalid vehicle type", 422);
    }
    //validation for vehicle cost per km
    if(!validator.isNumeric(req.body.cost_per_km))
    {
        return response(res, null, "invalid vehicle cost per km", 422);
    }
    //validation for vehicle cost per km
    if(!validator.isNumeric(req.body.capacity))
    {
        return response(res, null, "invalid vehicle capacity", 422);
    }
    req.body.features = req.body.features || [];
    var uid = req.body.operator;
    req.body.receiver = uid;
    req.body.description = "You added a vehicle";
    console.log(req.body);
      userService.getUserById(req.body.receiver).then(function(data){
    console.log("The name is",data.name);
     req.body.receiver_name = data.name;
    vehicleService.createVehicle(vehicleDto.unmarshal(req.body, picturename, uid)).then(function(data){
        if(!data){
            return response(res, null, "Failed", 500);
        }
        var arr = [];
        if(req.files){
            if(req.files.images){
                req.files.images.forEach(function(val, i){
                    var source = config.upload.images.temp + val.filename;
                    var path = config.upload.images.main + picturename[i];
                    fs.rename(source, path, function(err){
                        if(err){ throw err; }
                    });
                });
            }
            if(req.files.rc){
                var rcJson ={};
                rcJson.vehicle = data._id;
                rcJson.type = 'rc';
                arr.push(documentService.createDocument(documentDto.unmarshal(rcJson, vehicle_rc, uid)))
            }
            if(req.files.permit){
                var permitJson ={};
                permitJson.vehicle = data._id;
                permitJson.type = 'permit';
                arr.push(documentService.createDocument(documentDto.unmarshal(permitJson, vehicle_permit, uid)))
            }
        }
 notificationService.createNotification(req.body).then(function(data) {
                        console.log("notifcation send");
                    })

        return Q.all(arr);
    })
    .then(function(result){
        if(req.files){
            if(req.files.rc){
                var vehicle_rc_source = config.upload.images.temp + req.files.rc[0].filename;
                var vehicle_rc_path =  config.upload.images.main + vehicle_rc;
                fs.rename(vehicle_rc_source, vehicle_rc_path, function(err){
                    if(err){ throw err; }
                });
            }
            if(req.files.permit){
                var vehicle_permit_source = config.upload.images.temp + req.files.permit[0].filename;
                var vehicle_permit_path =  config.upload.images.main + vehicle_permit;
                fs.rename(vehicle_permit_source, vehicle_permit_path, function(err){
                    if(err){ throw err; }
                });
            }
        }
        return  response(res, null,  "document's information added", 200);
    }).catch(function(err){
        console.log(err);
        return  response(res, null,  err.message, 500);
    });
});
};