'use strict';
var model = require('../../model');
var State = model.States; // require city model
module.exports = {
	/**
	*get count cities list
	**/

	getCount : function(query){
		if(!query){
			return State.find().count();
		}else{
			return State.find(query).count();
		}
	},

	/**
	*get cities list
	**/

	getStates : function(query, offset, limit){
		if(!query){
			return State.find().skip(offset).limit(limit);
		}else{
			return State.find(query).skip(offset).limit(limit);
		}
	},

	

}
