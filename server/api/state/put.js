'use strict';
var model = require('../../model');
var City = model.City; // require city model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var moment = require('moment');
var cityService = require('./service');
module.exports = function(req, res){
  // updateQuery is a object that store fields that has to be update
  var updateQuery = {};
  if(req.body.city){
    //validation for city name exists
    if(!validator.isLength(req.body.city, 1))
    {
      return response(res, null, "invalid city name", 422);
    }else{
      updateQuery.city = req.body.city;
    }
  }
  if(req.body.state){
    //validation for state name exists
    if(!validator.isLength(req.body.state, 1))
    {
      return response(res, null, "invalid state name", 422);
    }else{
      updateQuery.state = req.body.state;
    }
  }
  if(req.body.zip){
    //validation for zip code exists
    if(!validator.isNumeric(req.body.zip, 1))
    {
      return response(res, null, "invalid zip code", 422);
    }else{
      updateQuery.zip = req.body.zip;
    }
  }

  updateQuery.modified =  moment.utc().format();
    // create new city if not already added
    cityService.getCityByStateName(updateQuery.city, updateQuery.state).then(function(data){
      if(data){
        return response(res, null,  "City already exists.", 409);
      }
      else{
        return cityService.updateCityById(req.params.id, updateQuery);
      }
    }).then(function(data){
      if(!data){
        return response(res, null,  "Failed", 500);
      }
      return response(res, data, "City updated successfully", 200);

    }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
  };
