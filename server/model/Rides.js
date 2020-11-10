var mongoose = require('mongoose');
var validator = require('validator'); // require to put server side validations
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
/**
* A Validation function for local strategy email
*/
var validateLocalStrategyEmail = function(email) {
    return (validator.isEmail(email, {require_tld: false}));
};

var rideSchema = new mongoose.Schema({
    /** To store the customer from the Users schema **/
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    /*To store the Assigned Vehicle for ride*/
    vehicle:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles'
     }],
   /*To store the Assigned Drivers for ride*/
     driver:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drivers'
     }],
    route: [
        {
            address:  {
                street: {type: String},
                city: {type: String, required: true},
                state: {type: String, required: true},
                country: {type: String, required: true},
                postCode: {type: String}
            },
            date_time: {type: Date}
        }
    ],
    stop_time: {type: Number}, //minutes
    passenger_count: {
        type: Number,
        required: true
    },
    vehicles_count: {
        type: Number,
        required: true
    },
    bid_end_time_customer: {type: Date},
    bid_end_time_operator: {type: Date},
    /** Contains the multiple bids info for particular ride **/
    bids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bids'
        }
    ],
    status: {
        type: Number,
        enum: [1, 2, 3, 4,5]
    },
    type:{
        type: Number,
        enum: [1, 2, 3, 4]
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: true},
    is_deleted: {type: Boolean, default: false}
   
});

var rideObj = mongoose.model('Rides', rideSchema);
rideSchema.plugin(deepPopulate, {
  whitelist: [
    'bids.operator',
    'bids'
  ]
});
module.exports = rideObj;
