var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var watchSchema = new mongoose.Schema({  
	operator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	ride: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rides',
		required: true
	},
	created: {type: Date, default: Date.now},    
	is_deleted: {type: Boolean, default: false}

});



var watchObj = mongoose.model('Watchlists', watchSchema);
module.exports = watchObj;