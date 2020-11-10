var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleCategorySchema = new mongoose.Schema({
	category: { type: String, required: 'Please enter the vehicle category'},
	created:{type:Date, default: Date.now()},
	modified:{type:Date},
	is_deleted:{type:Boolean, default:false}
});
var vehicleObj = mongoose.model('Vehicle_categories', vehicleCategorySchema);
module.exports = vehicleObj;
