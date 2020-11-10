var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** List of cities supported by the application can be added/modified from the backend **/
var citySchema = new mongoose.Schema({
	city: {type: String, required: 'Please enter the city name'},
	state: {type: String, required: 'Please enter the state name'},
	zip: {type: String, required: 'Please enter the zip code'},
	created: {type: Date, default: Date.now},
	is_deleted: {type: Boolean, default: false}
});

var cityObj = mongoose.model('Cities', citySchema);
module.exports = cityObj;