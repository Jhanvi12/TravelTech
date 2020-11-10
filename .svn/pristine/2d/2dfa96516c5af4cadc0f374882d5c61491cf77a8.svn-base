'use strict';
var model = require('../../model');
var Awaytaxi = model.AwayTaxi; // require city model
module.exports = {
	/**
	*get count cities list
	**/

	getCount : function(query){
		if(!query){
			return Awaytaxi.find().count();
		}else{
			return Awaytaxi.find(query).count();
		}
	},

	getawayTaxiById : function(id){
		// fetching city by its id
		return  Awaytaxi.findOne({"_id": id, "is_deleted": false}).exec();
	},

	getawaytaxiByoperatorId : function(id){
		// fetching city by its id
		return  Awaytaxi.find({"operator_id": id, "is_deleted": false}).populate("operator_id").populate("vehicle_id").exec();
	},

	updateawaytaxiById : function(id, updateQuery){
		 // updating new city
		 return  Awaytaxi.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
		},
	
	createawaytaxi : function(params){
	  // creating new inventory
	  console.log('params', params);
	  return Awaytaxi.create(params);
	},

	deleteawaytaxiById : function(id){
			return Awaytaxi.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
	}
}

