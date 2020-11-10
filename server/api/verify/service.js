'use strict';
var model = require('../../model');
var User = model.Users;
var dateDiff = require('../../components/dateOperations');
var validator = require('validator');
var moment = require('moment');
var Verification = model.Verification;
var d1 = new Date();
module.exports = {
	/**
	*activate user account
	**/

	activateUserAccount : function(uid, code){
	     return Verification.findOne({"user": uid, "code": code, expired: {$gt: moment.utc().format()}}).exec();
	},

	/**
	*resend Verification code
	*@param | Id | object id of role
	**/

	resendVerificationCode : function(id){
		//validation for User email
	      if(!validator.isEmail(req.body.email))
	      {
	          return response(res, null, "invalid email", 422);
	      }
	      Customer.find({where: {
	          email: req.body.email, is_deleted: false
	      }}).exec(function(err, user){
	        if (err) {
	            return response(res, null, err.message, 500);
	        }
	        if(user){
	            var random = Math.floor(Math.random() * 10000) + 1;
	            var mailSend = mail.verification(req.body.email, code);
	            var smsSend = sms.verification('+' + req.body.phone_number, code);
	            if(mailSend && smsSend){
	               return response(res, user, "verification code resended", 200);
	            }

	        }
	        else{
	            return response(res, null, "email doesn't not exists", 404);
	        }
      });
	},
	/**
	*get role by its id
	*@param | id 		  | objectId | object id of role
	*@param | updateQuery | object   | object contains parameter which has to be update
	**/
	verifyOperator : function(id, updateQuery){
		  // updateQuery is a object that store fields that has to be update
		  var updateQuery = {};
		  // aprove operator account
		  updateQuery.is_approved = true;
		  //change modified date
		  updateQuery.modified =  moment.utc().format();


		    // updating new role
		    Customer.findOne({_id: req.params.id}).exec(function (err, data) {
		      if (err) {
		          return response(res, null, err.message, 500);
		      }

		      if(!(_.isEmpty(updateQuery))){
		        if(req.body.password){
		          // matching old password
		          if(!passwordHash.verify(req.body.oldpassword, data.password)){
		              return response(res, null, "invalid old password", 422);
		          }else{
		              updateQuery.password = passwordHash.generate(req.body.password);
		          }
		        }
		      }
		      return Customer.update({_id: req.params.id}, updateQuery, {"new": true}).exec(function (err, data) {
		        if (err) {
		            return response(res, null, err.message, 500);
		        }
		        // updated!
		          return response(res, data, "role modified", 200);
		      });
		    });
	}
}
