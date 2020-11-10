var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var defaultVehiclesSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_categories',
        required: 'Please enter the vehicle category'
    },
    type: {type: String, required: 'Please enter the vehicle type'},
    capacity: {type: Number, required: 'Please enter the vehicle capacity'},
    created: {type: Date, default: Date.now()},
    modified: {type: Date},
    is_active: {type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false}
});
var vehicleObj = mongoose.model('DefaultVehicles', defaultVehiclesSchema);
module.exports = vehicleObj;
