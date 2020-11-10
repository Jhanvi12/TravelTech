'use strict';
var model = require('../../model');
var DocumentInfo = model.Documents; // require Driver_info model
module.exports = {
	/**
	*get driver's list
	*@param | Id | object id of operator
	**/

	getDocumentslist : function(query){
	return DocumentInfo.find(query).exec();
	},

	/**
	*get driver by its id
	*@param | Id | object id of role
	**/

	getDocumentById : function(id){
	return DocumentInfo.findOne({_id: id, is_deleted: false}).exec();
	},
	/**
	* updating driver info by its id
	*@param | id 		  | objectId | object id of role
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateDocumentById : function(id, updateQuery){
	  return  DocumentInfo.findOneAndUpdate({_id: id, is_deleted: false}, updateQuery, {"new": true});
	},
	/**
	*add driver info for operator
	*@param | params | object | contains parameters for creating new role
	**/
	createDocument : function(params){
		console.log(params, "**");
	  return  DocumentInfo.create(params);
	},

	/**
	*delete Driver by its id
	*@param | Id | object id of role
	**/
	deleteDocumentById : function(id){
	  return DocumentInfo.findOneAndUpdate({_id: id, is_deleted: false}, {is_deleted: true}, {"new": true});
  	},
	/**
	*delete Driver by its driver's id or vehicle's id
	*@param | Id | object id of related person
	**/
	deleteDocumentOfPerson : function(id){
	  return DocumentInfo.findOneAndUpdate({$or:{driver: id, vehicle: id, operator: id}, is_deleted: false}, {is_deleted: true}, {"new": true});
	}
}
