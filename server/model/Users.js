var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var userSchema = new mongoose.Schema({
    name: {type: String, required: 'Please enter the firstname'},
    role: {
        type: Number,
        required: 'Please enter user type',
        enum: [1, 2, 3, 4]
    },
    phone_number: {type: String, required: 'Please enter your contact number'},
    email: {type: String, unique: true, lowercase: true, required: 'Please enter your valid email'},
    password: {type: String, required: 'Please enter the password'},
    displayname: {type: String},
    profile_pic: {type: String},
    /** Employee personal details **/
    job_title: { type: String },
    department: { type: String },

    /** Customer address details **/
    address:  [{
        street: {type: String},
        city: {type: String},
        state: {type: String},
        country: {type: String},
        zip: {type: String}
    }],
    /** The section we are using only for providing access permission to employees on particular modules **/
    permissions: [{
        // permission_type: [{type: Number,
        //     enum: [0, 1, 2, 3, 4]
        // }],
        module: {type: Number,
            enum: [0, 1, 2, 3] /** Example module names are mentioned **/
        },
        is_active: {type: Boolean, default: false},
        name: {type: String, default: "module"}
    }],
    /** Security Questions & answers will be asked at the time of sign up **/
    security_question: {
        question: {type: Number, enum: [0, 1, 2, 3, 4]},
        answer: {type: String}
    },
    /** Notification setting for the user **/
    notification_setting: {
        sms: {type: Boolean, default: false},
        push_notification: {type: Boolean, default: false},
        email_notification: {type: Boolean, default: true}
    },
    /** Operator will have their own policies for customer to accept bid **/
    operator_policy_info: {
       // cancellation_policy: {type: String},
        multiple_pickups_policy: {type: String},
        terms_conditions: {type: String}
    },
    /*For saving bank details cheque*/

    /** Operator can add his personal info details **/
    operator_info: {
        vendor_code: {type: String},
        vendor_address: {type: String},
        vendor_city: {type: String},
        owner_name: {type: String},
        owner_phone_number: {type: String},
        office_phone_number: {type: String},
        working_hours: {type: String},
        service_tax_number: [{type: String}],
        pan_number: [{type: String}],
        website: {type: String},
        operating_location: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cities'
        }],
        id_proof:  {type: String},
        id_proof_company : {type : String},
        cancellation_policy: {type: String},
         manager_name1:{type: String},
         manager_name2:{type: String},
         manager_contactno1:{type: String},
         manager_contactno2:{type: String},
         operating_location:[
         {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cities'
         }
],
  home_location:[{
    address : {
                street: {type: String},
                city: {type: String},
                state: {type: String},
                country: {type: String},
                postCode: {type: String}
    }
  }]//recently added on 9 may for saving personal details
    },
    /** Operator can add his bank details **/
     bank_info: {
        account_name: {type: String},
        account_number: {type: String},
        ifsc_code: {type: String},
        bank_name: {type: String},
        bank_branch: {type: String},
        branch_address: {type: String},
        cheque: {type: String}
    },
    operator_rating: {type: Number},
    last_login_time: {type: Date, default: Date.now},
    is_approved: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false},
    device_info: {type: String},
    review:{type:Number,default : 0}
});

userSchema.plugin(deepPopulate,{
  whitelist: [
    'operator_info.operating_location'
  ]
});
var userObj = mongoose.model('Users', userSchema);
module.exports = userObj;
