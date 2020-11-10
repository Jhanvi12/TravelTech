var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var verificationSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	type: {
		type: Number,
		enum: [0, 1, 2, 3]
	},
	code: {type: String},
	created: {type: Date, default: Date.now},
	expired: {type: Date},
	status: {type: Boolean, default: true}
});


var verificationObj = mongoose.model('Verification', verificationSchema);
module.exports = verificationObj;
