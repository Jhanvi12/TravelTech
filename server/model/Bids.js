var mongoose = require('mongoose');
var validator = require('validator'); // require to put server side validations
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var bidSchema = new mongoose.Schema({
    vehicle_quote: [{
        vehicle: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicles',
            required: true
        }
        }],
        driver: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drivers'
        }],
        bid_amount: {type: Number, trim: true, required: 'Please enter the bid amount'},
        ride_duration: {type: Number, trim: true, required: 'Please enter the ride duration'},
    }],
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
    bid_rate_type: {
        type: String,
        enum: ["flat", "standard"]
    },
    bid_status: {
        type: Number,
        enum: [1,2,3]
    },

    accepted_date_time: {type: Date},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false}

});

bidSchema.plugin(deepPopulate,{
  whitelist: [
    'ride',
    'ride.vehicle',
    'ride.driver',
    'vehicle_quote[0]',
    'vehicle_quote.vehicle.id',
    'vehicle_quote.driver'
  ]
});


var bidObj = mongoose.model('Bids', bidSchema);
module.exports = bidObj;
