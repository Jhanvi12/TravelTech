'use strict';
var model = require('../../model');
var Watchlists = model.Watchlists; // require Watchlists model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require to put server side validations
var WatchlistsService = require('./service');
var Service = require('./service');
var config = require('config');
var Enum = require('enum');
var moment = require('moment');
var bidStatusEnum = new Enum(config.seeds.bid_status);
module.exports = function(req, res){
    
    //required validation for vehicle type and bid amount
   
    if(!validator.isMongoId(req.body.ride))
    {
        return response(res, null, "Please select ride", 422);
    }
      
  
    req.body.created =  Date.now();
    req.body.operator = req.user.uid;
   WatchlistsService.createWatchlists(req.body).then(function(data){
    if(data)
    {
       return response(res, data,  "Ride addeds", 200); 
    }
   });
  

};


