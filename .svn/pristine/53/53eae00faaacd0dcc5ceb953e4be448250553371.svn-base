'use strict';
var model = require('../../model');
var Preference = model.Preferences; // require Vehicle Category model
module.exports = {

	/**
	*get preference	
	**/

	getPreference : function(){
		// fetching 
		return Preference.findOne().exec();
	},

	/**
	*get Preference by its id
	*@param | params | object | contains parameters for creating new Preference
	**/
	createPreference : function(params){
	  // creating new Preference
	  return Preference.create(params);
	},
	
	/**
	*get preference by its id
	*@param | id 		  | objectId | object id of preference
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updatePreference : function(updateQuery){
		 // updating preference
		 return Preference.findOneAndUpdate({}, updateQuery, {"new": true});
		}		
	}