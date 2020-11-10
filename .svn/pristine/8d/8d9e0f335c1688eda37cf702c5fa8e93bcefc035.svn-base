var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var awaytaxiSchema = new mongoose.Schema({
    datefrom:{type:Date},
    dateto:{type:Date},
    priceoffer:{type:Number},
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
   
        vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles'
        },
   
        operator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false}

});


var inventoryObj = mongoose.model('Awaytaxi', awaytaxiSchema);
module.exports = inventoryObj;