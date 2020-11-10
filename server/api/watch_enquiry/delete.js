'use strict';
var model = require('../../model');
var Watchlists = model.Watchlists; // require Bid model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var WatchlistsService = require('./service.js');
module.exports = function(req, res){

    WatchlistsService.deleteWatchlistsById(req.params.id).then(function(){
    	console.log("delete...........");
        return response(res, null,  " Watchlists deleted", 200);
    }).catch(function(err){
        return  response(res, null,  err.message, 500);
    });
};
