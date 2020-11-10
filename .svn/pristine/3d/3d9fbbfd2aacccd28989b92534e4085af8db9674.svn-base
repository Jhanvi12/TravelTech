'use strict';
var model = require('../../model');
var User = model.Users;
var deepPopulate  = require('mongoose-deep-populate');
module.exports = {

	/**
	*get count users list
	**/

	getCount : function(query){
		if(!query){
			return User.find().count();
		}else{
			return User.find(query).count();
		}
	},

	/**
	*get users list
	**/

	getUsers : function(query,cities, offset, limit){
			console.log('cities', cities);
		if(!query && !cities){

			console.log("@@@@@@@@@@");
			return User.find().skip(offset).limit(limit);
		}else if(cities && cities != 'undefined'){
			console.log("!!!!!!!!!!!",cities);
			// return User.find({"role" : 2, "operator_info.operating_location":{ $regex: new RegExp("^" + cities.toLowerCase(), "i") }}).exec();
			return User.find({"role" : 2, 'operator_info.operating_location': {$in:[cities]}}).populate('operator_info.operating_location');

			// { categories:  {$in: ['5052843e023273693300010a']}}

		}else if(query) {
			console.log("#########",query);
			return User.find(query).skip(offset).limit(limit).deepPopulate('operator_info.operating_location');
		}
	},

	/**
	*get user by its id
	*@param | Id | object id of user
	**/

	getUserById : function(id){
		// fetching user by its id
	  return User.findOne({"_id": id, "is_deleted": false}).populate(['operator_info.operating_location']).exec();
	},


	/**
	*get user by its email
	*@param | email | object email of user
	**/

	getUserByEmail : function(email){
		// fetching user by its email
	  return User.findOne({"email": email, "is_deleted": false}).exec();
	},

	/**
	*get user by its email
	*@param | phone | INTEGER | Phone number of user
	**/

	getUserByPhone : function(phone){
		// fetching user by its email
	  return User.findOne({"phone_number": phone, "is_deleted": false}).exec();
	},

	/**
	*get user by its id
	*@param | id 		  | objectId | object id of user
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	updateUserById : function(id, updateQuery){
		 // updating new user
	  return User.findOneAndUpdate({_id: id, "is_deleted": false}, updateQuery, {"new": true});
	},
	/**
	*get user by its id
	*@param | params | object | contains parameters for creating new user
	**/
	createUser : function(params){
	  // creating new user
	  return User.create(params);
	},

	/**
	*get user by its id
	*@param | Id | object id of user
	**/
	deleteUserById : function(id){
	  return User.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
	 },

	getOperatorCsvFile : function(cities,query){
		if(cities != 'undefined'){
			return User.find({"role" : 2, "operator_info.operating_location":{ $regex: new RegExp("^" + cities.toLowerCase(), "i") }}).exec();
		}else {
			return User.find(query).exec();
		}
	},

	getCustomerCsvFile : function(){
	  return User.find({"role" : 1}).exec();
	},
 
	getEmployeeCsvFile : function(){
	  return User.find({"role" : 4}).exec();
	},

	getCorporateCsvFile : function(){
	  return User.find({"role" : 5}).exec();
	}


}
