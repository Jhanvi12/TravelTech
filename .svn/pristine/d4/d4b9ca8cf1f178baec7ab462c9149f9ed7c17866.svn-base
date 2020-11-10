'use strict';
var model = require('../../model');
var Watchlists = model.Watchlists; // require Bid model

module.exports = {
	/**
	*get Watchlists list
	**/
	getWatchlists : function(query){
		return Watchlists.find(query).populate(['operator','ride']).exec();
	},


	/**
	*createWatchlists
	*
	**/
	createWatchlists : function(params){

		return Watchlists.create(params);

	},

	/**
	*delete watchlist by its id
	*@param | Id | object id of watchlist
	**/
	deleteWatchlistsById : function(id){

		return Watchlists.findOneAndUpdate({"ride": id}, {"is_deleted": true}, {"new": true}).exec();
	}

}
