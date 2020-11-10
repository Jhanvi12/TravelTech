var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new mongoose.Schema({
    driver_expense: {type: String},
    guest_name: {type: String},
    guest_phone_number: {type: String},
    guest_email :{type : String},
    remark:{type:String},
    pickup_date:{type:Date},
    dropoff_date:{type:Date},
    holding_time:{type:Number},
    booking_from:{type:String},
    booking_id:{type:String},
    booking_price:{type:Number},
    route_itineary:{type:String},
    total_bookingAmount:{type:Number},
    route: [
        {
            address:  {
                street: {type: String},
                city: {type: String},
                state: {type: String},
                country: {type: String},
                postCode: {type: String}
            }  
        }
    ],
   
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drivers'
        },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles'
        },
    ride_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride'
        },
     vehicle: [{
     
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicles'
        
    } ],
        operator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    booking_date: {type: Date},
    driver_allowances: {type: Number},
    advance_received: {type: Number},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false}

});


var inventoryObj = mongoose.model('Inventory', inventorySchema);
module.exports = inventoryObj;