'use strict';
var model = require('../../model');
var City = model.Cities; // require city model
module.exports = {
	/**
	*get count cities list
	**/

	getCount : function(query){
		if(!query){
			return City.find().count();
		}else{
			return City.find(query).count();
		}
	},

	/**
	*get cities list
	**/

	getCities : function(query, offset, limit){
		if(!query){
			return City.find().skip(offset).limit(limit);
		}else{
			return City.find(query).skip(offset).limit(limit);
		}
	},

	/**
	*get city by its id
	*@param | Id | object id of city
	**/

	getCityById : function(id){
		// fetching city by its id
		return  City.findOne({"_id": id, "is_deleted": false}).exec();
	},

	/**
	*get city by its state name
	*@param | state | state name
	**/

	getCityByStateName : function(city, state){
	  // fetching city by its state
	  return City.findOne({$and: [{"city": city}, {"state": state}, {"is_deleted": false}]}).exec();
	},
	/**
	*get city by its id
	*@param | id 		  | objectId | object id of city
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateCityById : function(id, updateQuery){
		 // updating new city
		 return  City.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
		},
	/**
	*get city by its id
	*@param | params | object | contains parameters for creating new city
	**/
	createCity : function(params){
	  // creating new city
	  return City.create(params);
	},

	/**
	*get city by its id
	*@param | Id | object id of city
	**/
	deleteCityById : function(id){
		return City.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
	},

	getCitiesCsvFile : function(){
	  return City.find({});
	}

}
