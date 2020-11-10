'use strict';
var model = require('../../model');
var Inventory = model.Inventories; // require city model
module.exports = {
	/**
	*get count cities list
	**/

	getCount : function(query){
		if(!query){
			return Inventory.find().count();
		}else{
			return Inventory.find(query).count();
		}
	},

	/**
	*get list
	**/

	getInventory : function(query, offset, limit){
		if(!query){
			return Inventory.find().skip(offset).limit(limit);
		}else{
			return Inventory.find(query).skip(offset).limit(limit);
		}
	},

	/**
	*get by its id
	*@param | Id | object id of inventory
	**/

	getInventoryById : function(id){
		// fetching city by its id
		return  Inventory.findOne({"_id": id, "is_deleted": false}).exec();
	},

	getInventoryByoperatorId : function(id){
		// fetching city by its id
		return  Inventory.find({"operator_id": id, "is_deleted": false}).populate("operator_id").populate("driver_id").populate("vehicle_id").exec();
	
	},

	/**
	*UPDATE by its id
	*@param | id 		  | objectId | object id
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateInventoryById : function(id, updateQuery){
		 // updating new city
		 return  Inventory.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
		},
	/**
	*get city by its id
	*@param | params | object | contains parameters for creating new city
	**/
	createInventory : function(params){
	  // creating new inventory
	  console.log('params', params);
	  return Inventory.create(params);
	},

	/**
	*get city by its id
	*@param | Id | object id of city
	**/
	deleteInventoryById : function(id){
			return Inventory.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
	}
}

