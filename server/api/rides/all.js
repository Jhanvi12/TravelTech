'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var rideService = require('./service.js');
var preferenceService = require('../preferences/service.js');
var userService = require('../users/service.js');
var moment=require('moment');
var Q = require('q');
var model = require('../../model');
var config = require('config');
var Enum = require('enum');
var rideStatusEnum = new Enum(config.seeds.ride_status);
var rideTypeEnum = new Enum(config.seeds.ride_type);
var Bid = model.Bids;
var deepPopulate  = require('mongoose-deep-populate');


module.exports = function(req, res){
  var op_id;
    console.log('The query parameters is',req.query);
    var query={};
    var current=req.query.current_bids;
    if(!req.query.all){
        query.customer = req.query.customer ? req.query.customer : req.user.uid;
    }
    if(req.query.status){
        query.status = rideStatusEnum.get(req.query.status).value;
    }
     if(req.query.fromdate){
        var start = new Date(moment(req.query.fromdate).hours(0).minutes(1));
       // var end = new Date();
      //  query["route.date_time"]= { $gte: start, $lte: end };
      query["route.date_time"]={$gte:start};
    }
    if(req.query.fromdate && req.query.todate){
        var start = new Date(moment(req.query.fromdate).hours(0).minutes(1));
        var end = new Date(moment(req.query.todate).hours(23).minutes(59));
        query["route.date_time"]= { $gte: start, $lte: end };
    }
    
    if(req.query.type){
        query.type=req.query.type;
    }
    if(req.query.city){
        query["route.address.city"] = req.query.city;
    }
    var limit = 10;
    query.is_deleted = false;

  var operator=req.query.operator;
  console.log('The operator login is',req.user.uid);
    if(current){
        query.status = rideStatusEnum.get('open').value;
        preferenceService.getPreference().then(function(data){
            var calculatedDate = moment().utc();
            calculatedDate.hour(calculatedDate.hour() - data.bidding_time_limit);
            query["created"]= {$gt: calculatedDate.format()};
            return userService.getUserById(req.user.uid);
        }).then(function(user){
            var cityarr= [];
            user.address.forEach(function(val) {
                cityarr.push(val.city)
            });
            query["route.address.city"] = {$in: cityarr};
            return Q.all([rideService.getBRides(query, req.query.offset, limit,operator), rideService.getCount(query)]);
        }).then(function(result){
            if(!result[0] || !result[0].length){
                return response(res, null,  "no content", 204);
            }
            var data = {};
           var nobidforthisride=[];
         //   data.count = result[1];
          //  data.data = result[0];
              result[0].forEach(function(item){
           if(item.bids == [] || item.bids==""){
              console.log('no bids for this',item);
              nobidforthisride.push(item);
          }else{
            console.log('there is  a bid',item);
          }
 
        });
            // Fetched ride data!
           data.count=nobidforthisride.length;
           data.data = nobidforthisride;
          // data.datac=result[0].length;
           console.log('the data is',data);
            // Fetched ride data!
         
          
            return  response(res, data,  "ride fetchedd", 200);
        }).catch(function(err){
            return  response(res, null,  err.message, 500);
        });
    }else{
     
        Q.all([rideService.getRides(query, req.query.offset, limit), rideService.getCount(query)]).then(function(result){
            if(!result[0] || !result[0].length){
                return response(res, null,  "no content", 204);
            }

            var data = {};
            data.count = result[1];
            data.data = result[0];
             /*GARBAGE OF 16MAY*/
            /*data.data.forEach(function(item){
               item.bids.forEach(function(operatorname){
                    console.log('the op name is',operatorname.operator);
                    userService.getUserById(operatorname.operator).then(function(users){
                      
                        console.log('The data of op is',users, JSON.stringify(users));
                               data.operatordata = users;
                               return  response(res, data,  "ride fetched", 200);
                      
                    });




               });
            });*/
               
            // Fetched ride data!
             return  response(res, data,  "ride fetched", 200);
        }).catch(function(err){
            return  response(res, null,  err.message, 500);
        });
    }
};