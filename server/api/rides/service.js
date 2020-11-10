'use strict';
var model = require('../../model');
var deepPopulate  = require('mongoose-deep-populate');
var Ride = model.Rides; // require Ride model

module.exports = {

	/**
	*get count rides
	**/

	getCount : function(query){
		if(!query){
			return Ride.find().count();
		}else{
			return Ride.find(query).count();
		}
	},

	/**
	*get rides list
	**/
	getRides : function(query, offset, limit){
    return Ride.find(query).sort({'created': -1}).skip(offset).limit(limit).populate('customer').deepPopulate('bids.operator').populate('customer vehicle driver').exec();

	},

	 getRideByIds : function(id){
        // fetching ride by its id
        return Ride.findOne({"_id": id}).populate(['customer vehicle driver']).exec();
    },


	/**
	*get ride by its id
	*@param | Id | object id of ride
	**/

	getRideById : function(id){
		// fetching ride by its id
	    return Ride.findOne({"_id": id},{"is_deleted":false}).populate(['customer vehicle driver']).exec();
	},

	

	/**
	*create ride by its id
	*@param | params | object | contains parameters for creating new ride
	**/
	createRide : function(params){
		 // creating new ride
		 console.log('params', params)
	    return Ride.create(params);
	},
	/**
	*update ride by its id
	*@param | id 		  | objectId | object id of ride
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateRideById : function(id, updateQuery){
		 // updating new ride
	    return Ride.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
	},
	/**
	*get not bid list
	**/
	getBRides : function(query, offset, limit,operator){
	  return Ride.find(query).sort({'created': -1}).skip(offset).limit(limit).populate('customer vehicle driver').populate({path: 'bids',match:{ "operator": operator}}).exec();
	},
	/**
	*delete ride by its id
	*@param | Id | object id of ride
	**/
	deleteRideById : function(id){
		// return Ride.findOneAndUpdate({_id: id}, {is_deleted: true}, {"new": true});
		return Ride.findOneAndUpdate({_id: id}, {"is_deleted": true}, {"new": true});
	},

	getUpcomingRidesCsvFile : function(){
	  return Ride.find({status:2}).populate('customer').exec();
    },

	getCancelledRidesCsvFile : function(){
	  return Ride.find({status:4}).populate('customer').exec();
    },

	getCompletedRidesCsvFile : function(){
	  return Ride.find({status:3}).populate('customer').exec();
  	},

	getNoShowRidesCsvFile : function(){
	  return Ride.find({status:5}).populate('customer').exec();
   },

    getOpenLeadCsvFile : function(){
	 return Ride.find({status:1}).populate('customer').exec();
  }


}
