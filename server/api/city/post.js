'use strict';
var model = require('../../model');
var City = model.City; // require City model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var cityService = require('./service');
module.exports = function(req, res){
    //validation for city name exists
    if(!validator.isLength(req.body.city, 1))
    {
        return response(res, null, "invalid city name", 422);
    }
    //validation for state name exists
    if(!validator.isLength(req.body.state, 1))
    {
        return response(res, null, "invalid state name", 422);
    }
    //validation for zip code exists
    if(!validator.isNumeric(req.body.zip, 1))
    {
        return response(res, null, "invalid zip code", 422);
    }
    var jsonData = req.body;    
    // create new city if not already added
    cityService.getCityByStateName(jsonData.city, jsonData.state).then(function(data){      
        if(data){
          return response(res, null,  "City already exists.", 409);
        }        
        else{
          return cityService.createCity(jsonData);
        }
    }).then(function(data){
      if(!data){
        return response(res, null,  "Failed", 500);
    }      
    return response(res, data, "City created successfully", 200);

    }).catch(function(err){
       return  response(res, null,  err.message, 500);
    });
};
