var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    description: {type: String},
    created: {type: Date, default: Date.now},
    is_read: {type: Boolean, default: false},
    receiver_name:{type: String},
    is_deleted: {type: Boolean, default: false}
});

var notificationObj = mongoose.model('Notification', notificationSchema);
module.exports = notificationObj;
