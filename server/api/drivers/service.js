'use strict';
var model = require('../../model');
var DriverInfo = model.Drivers; // require Driver_info model
module.exports = {

	/**
	*get count drivers list
	**/

	getCount : function(query){
		if(!query){
			return DriverInfo.find().count();
		}else{
			return DriverInfo.find(query).count();
		}
	},

	/**
	*get driver's list
	*@param | Id | object id of operator
	**/

	getdriverslist : function(query, offset, limit){
		if(!query){
			return DriverInfo.find().skip(offset).limit(limit).populate('operator').exec();
		}else{
			return DriverInfo.find(query).skip(offset).limit(limit).populate('operator').exec();
		}
	},


	/**
	*get driver by its id
	*@param | Id | object id of role
	**/

	getDriversById : function(id){
	return DriverInfo.findOne({_id: id, is_deleted: false}).exec();
	},
	/**
	* updating driver info by its id
	*@param | id 		  | objectId | object id of role
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateDriverById : function(id, updateQuery){
	  return  DriverInfo.findOneAndUpdate({_id: id, is_deleted: false}, updateQuery, {"new": true});
	},
	/**
	*add driver info for operator
	*@param | params | object | contains parameters for creating new role
	**/
	createDriver : function(params){
	  return  DriverInfo.create(params);
	},

	/**
	*delete Driver by its id
	*@param | Id | object id of role
	**/
	deleteDriverById : function(id){
	  return DriverInfo.findOneAndUpdate({_id: id, is_deleted: false}, {is_deleted: true}, {"new": true});
  },

  getDriverCsvFile : function(){
	return DriverInfo.find({}).populate('operator').exec();
  }

}
