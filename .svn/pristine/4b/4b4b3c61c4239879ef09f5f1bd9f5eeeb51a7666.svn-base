'use strict';
var model = require('../../model');
var VehicleInfo = model.Vehicles; // require Driver_info model
module.exports = {

	/**
	*get count vehicles list
	**/

	getCount : function(query){
		if(!query){
			return VehicleInfo.find().count();
		}else{
			return VehicleInfo.find(query).count();
		}
	},

	/**
	*get vehicle's list
	*@param | Id | object id of operator
	**/

	getVehicleList : function(query, offset, limit){
		if(!query){
			return VehicleInfo.find().skip(offset).limit(limit).populate('category').populate('operator').exec();
		}else{
			return VehicleInfo.find(query).skip(offset).limit(limit).populate('category').populate('operator').exec();
		}
	},

	/**
	*get vehicle by its id
	*@param | Id | object id of role
	**/
	getVehicleById : function(id){
	return VehicleInfo.findOne({_id: id, is_deleted: false}).populate('category').exec();
	},
	/**
	* updating vehicle info by its id
	*@param | id 		  | objectId | object id of role
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateVehicleById : function(id, updateQuery){
	  return  VehicleInfo.findOneAndUpdate({_id: id, is_deleted: false}, updateQuery, {"new": true});
	},
	/**
	*add vehicle info for operator
	*@param | params | object | contains parameters for creating new role
	**/
	createVehicle : function(params){
	  return  VehicleInfo.create(params);
	},
	/**
	*delete vehicle by its id
	*@param | Id | object id of role
	**/
	deleteVehicleById : function(id){
	  return VehicleInfo.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
    },

	getVehicleCsvFile : function(){
	  return VehicleInfo.find({}).populate('operator category').exec();
	}


}
