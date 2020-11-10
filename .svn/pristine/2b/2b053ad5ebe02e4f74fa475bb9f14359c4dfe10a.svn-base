'use strict';
var model = require('../../model');
var Bid = model.Bids;
var Ride = model.Rides // require Bid model
var deepPopulate  = require('mongoose-deep-populate');

module.exports = {
    /**
     *get count bids
     **/

    getCount: function(query) {
        if (!query) {
            return Bid.find().count();
        } else {
            return Bid.find(query).count();
        }
    },
    /**
     *get bids list
     type:params(ride,operator,user)
     **/
    getBids: function(query) {
        console.log('query', query);
        return Bid.find(query).populate('operator').deepPopulate('vehicle_quote.vehicle.id').populate('ride').populate('vehicle_quote.vehicle').populate('vehicle_quote.driver').lean().exec();
        // return Bid.find(query).populate('operator').populate('ride').populate('vehicle_quote.vehicle.id').populate('vehicle_quote.driver').lean().exec();
        // return Bid.find(query).populate('operator').populate('vehicle_quote.vehicle').populate('ride').populate('vehicle_quote.driver').lean().exec();
    },
    /**
     *get bid by its id
     *@param | Id | object id of bid
     **/

    getBidById: function(id) {
        // fetching bid by its id

        return Bid.findOne({"_id": id, is_deleted: false}).populate('operator').populate('vehicle_quote.vehicle.id').populate('vehicle_quote.vehicle').populate('vehicle_quote.driver').lean().exec();

    },
    /**
     *create bid by its id
     *@param | params | object | contains parameters for creating new bid
     **/
    createBid: function(params) {
        return Bid.create(params);
    },
    /**
     *update bid by its id
     *@param | id         | objectId | object id of bid
     *@param | updateQuery | object   | object contains parameter which has to be update
     **/
    updateBidById: function(id, updateQuery) {
        return Bid.findOneAndUpdate({_id: id}, updateQuery, {"new": true}).exec();

    },
    /*To update the bid after assignments of driver*/
    updateBidDriverById:function(id,updateQuery){
        console.log('in service the id  and update query is',id,updateQuery);
        return Bid.findOneAndUpdate({_id: id},  { $set: { "vehicle_quote.0.driver": updateQuery } }, {"new": true}).exec();
    },
    /**
     *get bid by its ride id
     *@param | Id | ride id of bid
     **/

    getLowestBidById: function(id) {
        // fetching lowest bid by its ride id
        return Bid.find({"ride": id, is_deleted: false}).populate('operator vehicle_quote.vehicle.id vehicle_quote.driver').lean().exec();

    },
    /**
     *delete bid by its id
     *@param | Id | object id of bid
     **/
    deleteBidById: function(id) {
        console.log('Id', id);
        return Bid.findOneAndUpdate({_id: id, is_deleted: false}, {is_deleted: true}, {"new": true});


    },

    getBidsCsvFile : function(){
	  return Bid.find({}).populate('ride operator').deepPopulate('vehicle_quote.vehicle.id').exec();
	}

   

}
