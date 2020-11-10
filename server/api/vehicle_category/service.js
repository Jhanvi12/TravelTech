'use strict';
var model = require('../../model');
var VehicleCategory = model.Vehicle_categories;
module.exports = {
	/**
	*get Vehicle Categories list
	**/
	getVehicleCategories : function(query){
		return VehicleCategory.find(query).exec();
	},
	/**
	*get Vehicle Category by its id
	*@param | Id | object id of Vehicle Category
	**/
	getVehicleCategoryById : function(id){
	  return  VehicleCategory.findOne({"_id": id}).exec();
	},
	/**
	*get VehicleCategory by its id
	*@param | id 		  | objectId | object id of Vehicle Category
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateVehicleCategoryById : function(id, updateQuery){
	  return  VehicleCategory.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
	},
	/**
	*get Vehicle Category by its id
	*@param | params | object | contains parameters for creating new Vehicle Category
	**/
	createVehicleCategory : function(params){
	  return  VehicleCategory.create(params);
	},
	/**
	*get Vehicle Category by its id
	*@param | Id | object id of Vehicle Category
	**/
	deleteVehicleCategoryById : function(id){
	  return VehicleCategory.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
	}
}
