var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** List of preferences common for the application can be added/modified from the backend **/
var preferenceSchema = new mongoose.Schema({
	bidding_time_limit: {type: Number, required: 'Please enter the bidding time limit'},
	bidding_acceptance_time:  {		
        less_than_2_days: {type: Number},
        between_3_4_days: {type: Number},
        more_than_4_days: {type: Number}        
    },
    working_daysfrom: {type: String},
    working_daysto: {type: String},
    working_starttime: {type: String},
    working_endtime: {type: String},
    time_Differnce: {type: Number},
	commission_rate: {type: String, required: 'Please enter the commission rate'},
	markup_bid_rate: {type: String, required: 'Please enter the bid rate'},
	created: {type: Date, default: Date.now},	
	modified: {type: Date}
});

var preferenceObj = mongoose.model('Preferences', preferenceSchema);
module.exports = preferenceObj;