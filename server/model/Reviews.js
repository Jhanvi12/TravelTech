var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new mongoose.Schema({
    /** User who will provide the review **/
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rides',
        required: true
    },
    /** Review on particular vehicle **/
    operator: {
        operator_details: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        message: {type: String},
        rating: {type: String}
    },
    vehicle: {
        vehicle_details: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicles'
        }],
        // message: {type: String},
        rating: {type: String}
    },

    /** Review on particular driver **/
    driver: {
        driver_details:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drivers'
        }],
        // message: {type: String},
        rating: {type: String}
    },
    created: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false},
    reviewer_name:{type: String}

});


var Obj = mongoose.model('Reviews', reviewSchema);
module.exports = Obj;
