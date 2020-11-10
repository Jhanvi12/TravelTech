'use strict';
var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var Enum = require('enum');
var vehicleFeaturesEnum = new Enum(config.seeds.vehcile_features);
var moment = require('moment');
var vehicleService = require('./service');
var vehicleDto = require('../../dto/vehicle');
var fs = require('fs');
var _ = require('lodash');
var passwordHash = require('password-hash');
var documentDto = require('../../dto/document');
var documentService = require('../documents/service.js');
var Q = require('q');
function vehicleFeaturesValue(features){
    var arr= [];
    features.forEach(function(val){
        arr.push(vehicleFeaturesEnum.get(val).value);
    });
    return arr;
}
module.exports = function(req, res){
    var picturename = [];
    var vehicle_rc = null;
    var vehicle_permit = null;
    // updateQuery is a object that store fields that has to be update
    var updateQuery = {};
    // checking vehicle type
    if(req.body.type){
        //validation for vehicle type

        if(!validator.isLength(req.body.type, 1))
        {
            return response(res, null, "invalid vehicle type", 422);
        }else{
            updateQuery.type = req.body.type;
        }
    }
    // checking registration_number
    if(req.body.registration_number){
        //validation for registration_number exists
        if(!validator.isLength(req.body.registration_number, 1))
        {
            return response(res, null, "invalid registration number", 422);
        }else{
            updateQuery.registration_number = req.body.registration_number;
        }
    }
    // checking category
    if(req.body.category){
        //validation for registration_number exists
        if(!validator.isLength(req.body.category, 1))
        {
            return response(res, null, "invalid category", 422);
        }else{
            updateQuery.category = req.body.category;
        }
    }
    //checking vehicle features
    if(req.body.features){
        //validation for lastname exists
        updateQuery.features = vehicleFeaturesValue(req.body.features);
    }
    //checking vehicle cost_per_km
    if(req.body.cost_per_km){
        //validation for cost_per_km exists
        if(!validator.isLength(req.body.cost_per_km, 1)){
            return response(res, null, "invalid cost_per_km", 422);
        }else{
            updateQuery.cost_per_km =req.body.cost_per_km;
        }
    }
    //checking vehicle capacity
    if(req.body.capacity){
        //validation for capacity exists
        if(!validator.isLength(req.body.capacity, 1)){
            return response(res, null, "invalid capacity", 422);
        }else{
            updateQuery.capacity =req.body.capacity;
        }
    }
    //checking attachments
    if(req.files)
    {
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
            updateQuery.images = picturename;
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


    }
    updateQuery.modified =  moment.utc().format();
    var vehicleData = null;
    vehicleService.updateVehicleById(req.params.id, updateQuery).then(function(data){
        vehicleData = data;
        if(!data){
            return response(res, null, "Failed", 500);
        }
        var arr = [];
        //checking attachments
        if(req.files)
        {
            if(req.files.images){
                // moving all images of vehicle from temp to main
                if(req.files.images.length){
                    req.files.images.forEach(function(val, i){
                        var source = config.upload.images.temp + val.filename;
                        var path = config.upload.images.main + picturename[i];
                        fs.rename(source, path, function(err){
                            if(err){ throw err; }
                        });
                    });
                }
            }
            if(req.files.rc){
                var rcJson ={};
                rcJson.vehicle = data._id;
                rcJson.type = 'rc';
                arr.push(documentService.createDocument(documentDto.unmarshal(rcJson, vehicle_rc, req.user.uid)))
            }
            if(req.files.permit){
                var permitJson ={};
                permitJson.vehicle = data._id;
                permitJson.type = 'permit';
                arr.push(documentService.createDocument(documentDto.unmarshal(permitJson, vehicle_permit, req.user.uid)));
            }
        }
        return Q.all(arr);
    }).then(function(result){
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
        return  response(res, vehicleData,  "document's information updated", 200);
    }).catch(function(err){
        console.log(err);
        return  response(res, null,  err.message, 500);
    });
};
