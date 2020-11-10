'use strict';
var model = require('../../model');
var User = model.Users; 
module.exports = {
	/**
	*@CheckUserCredentials
    * its a function fetch user's data by its username or email or phone number
    * @param | username | String | it should be phone number or username or email
	**/
	CheckUserCredentials : function(username){
	       return User.findOne({ $or: [{email: username}, {username: username}, {phone_number: username}], is_active: true, is_deleted: false}).exec();
	}
};
