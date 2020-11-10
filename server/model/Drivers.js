var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var driverSchema = new mongoose.Schema({
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {type: String, required: 'Please enter the driver firstname'},
    profile_pic: {type: String},
    phone_number: {type: String, required: 'Please enter the driver contact number'},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_approved: {type: Boolean, default: false},
    is_active: {type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false}
});
driverSchema.plugin(deepPopulate,{
  whitelist: [
    'operator'
  ]
});

var driverObj = mongoose.model('Drivers', driverSchema);
module.exports = driverObj;
