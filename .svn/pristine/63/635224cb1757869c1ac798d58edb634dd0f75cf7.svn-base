'use strict';
var model = require('../../model');
var User = model.User; // require Role model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var documentService = require('./service');
// data travvelling object
var documentDto = require('../../dto/document');
var fs = require('fs');
var _ = require('lodash');
var passwordHash = require('password-hash');
var Enum = require('enum');
var documentTypeEnum = new Enum(config.seeds.document_type);
var documentStatusEnum = new Enum(config.seeds.document_status);
module.exports = function(req, res){
    var documentname = null;
    // updateQuery is a object that store fields that has to be update
    var updateQuery = {};
    updateQuery.name = {};

    //checking phone number
    if(req.body.status)
    {
        //validation for User's phone no.
        if(!validator.isLength(req.body.status, 1))
        {
            return response(res, null, "invalid status", 422);
        }else{
            updateQuery.status = documentStatusEnum.get(req.body.status).value;
        }
    }
    //checking activation and de-activation of account
    if(req.body.decline_comment)
    {
        //validation for User's phone no.
        if(!validator.isBoolean(req.body.decline_comment))
        {
            return response(res, null, "invalid decline comment", 422);
        }else{
            updateQuery.decline_comment = req.body.decline_comment;
        }
    }
    //checking attachments
    if(req.files)
    {
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
                updateQuery.path = documentname;
            }
        }
    }
    updateQuery.modified =  moment.utc().format();
    documentService.updateDocumentById(req.params.id, updateQuery).then(function(data){
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
        return  response(res, result,  "document's information updated", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
