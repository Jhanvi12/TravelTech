var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** List of cities supported by the application can be added/modified from the backend **/
var stateSchema = new mongoose.Schema({
	code: {type: String, required: 'Please enter the state name'},
	state: {type: String, required: 'Please enter the state name'},
	created: {type: Date, default: Date.now},
	is_deleted: {type: Boolean, default: false}
});

var stateObj = mongoose.model('state', stateSchema);
module.exports = stateObj;