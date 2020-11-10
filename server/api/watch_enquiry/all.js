'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var WatchlistsService = require('./service.js');

module.exports = function(req, res){

var query = {};
query.operator = req.user.uid;
query.is_deleted = false;
  //fetching Watchlists service
  WatchlistsService.getWatchlists(query).then(function(data){

     if(!data || !data.length){
       return response(res, null,  "no content", 204);
     }
     // Fetched bid data!
     return  response(res, data,  "watchList fetched", 200);
   }).catch(function(err){
     return  response(res, null,  err.message, 500);
   });
};
