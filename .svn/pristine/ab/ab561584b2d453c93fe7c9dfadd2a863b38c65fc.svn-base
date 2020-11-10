var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponCodesSchema = new mongoose.Schema({
    type: {type: String},
    code: {type: String},
    discount: {type: Number},
    attempt: {type: Number},
    duration: {type: Number},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false}

});

var Obj = mongoose.model('Coupons', couponCodesSchema);
module.exports = Obj;