var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new mongoose.Schema({
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_categories',
        required: true
    },
    type: {type: String, required: 'Please enter the vehicle type'},
    registration_number: {type: String, required: 'Please enter the vehicle number'},
    features: [{
        type: Number,
        enum: [1, 2, 3]
    }],
    images: [{type: String}],
    capacity: {type: Number},
    cost_per_km: {type: Number, required: 'Please enter the vehicle cost per km'},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_approved: {type: Boolean, default: false},
    is_active: {type: Boolean, default: true},
    is_deleted: {type: Boolean, default: false}
});


var vehicleObj = mongoose.model('Vehicles', vehicleSchema);
module.exports = vehicleObj;
