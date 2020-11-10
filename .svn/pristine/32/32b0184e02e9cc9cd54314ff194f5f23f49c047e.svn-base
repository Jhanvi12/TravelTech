'use strict';
var model = require('../../model');
var Module = model.Module; // require module model
var moduleDto = require('../../dto/module');
module.exports = {
	/**
	*get modules list
	**/

	getModules : function(){
		return Module.find().exec();
	},

	/**
	*get module by its id
	*@param | Id | object id of module
	**/

	getModuleById : function(id){
		// fetching module by its id
	  return  Module.findOne({"_id": id}).exec();
	},
	/**
	*get module by its id
	*@param | id 		  | objectId | object id of module
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateModuleById : function(id, updateQuery){
		 // updating new module
	  return  Module.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
	},
	/**
	*get module by its id
	*@param | params | object | contains parameters for creating new module
	**/
	createModule : function(params){
		 // creating new module
	  return  Module.create(params);
	},

	/**
	*get module by its id
	*@param | Id | object id of module
	**/
	deleteModuleById : function(id){
	  return Module.remove({"_id": id}).exec();
	}
}
