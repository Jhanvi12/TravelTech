'use strict';
var model = require('../../model');
var emailTemplate = model.emailTemplates;
module.exports = {
	/**
	*get user by its id
	*@param | params | object | contains parameters for creating new user
	**/
	createEmailTemplate : function(params){
	  // creating new user
      console.log(params);
	  return emailTemplate.create(params);
    },

    getAllEmailTemplates: function(query){
		if(!query){
	  		return emailTemplate.find({isDeleted: false});
  		}else{
	  		return emailTemplate.find(query);
  		}
    },

	getEmailTemplateById: function(id){
	  return emailTemplate.findOne({_id:id, isDeleted: false});
    },

	updateEmailTemplate : function(id,data){
	  // creating new user
      console.log(data);
	  return emailTemplate.update({_id:id},{$set:data});
    },
	deleteemailtemplatebyid:function(id){
		console.log(id);
	  return emailTemplate.update({_id:id},{$set:{isDeleted:true}});
    }



}
