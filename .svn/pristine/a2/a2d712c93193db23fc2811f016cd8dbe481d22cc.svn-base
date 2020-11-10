var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new mongoose.Schema({
	operator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Drivers'
	},
	vehicle: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vehicles'
	},
	type: {type:Number, enum: [1, 2, 3, 4]},
	path: { type: String, required: 'Please enter the document path'},
	created: {type:Date, default: Date.now},
	modified: {type:Date, default: Date.now},
	is_deleted: {type:Boolean, default:false},
	status: {
		type: Number,
		enum: [1, 2, 3]
	},
	decline_comment: {type:String}
});


var documentObj = mongoose.model('Documents', documentSchema);
module.exports = documentObj;
