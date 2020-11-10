'use strict';
var models = require('../model');
var User = models.Users;
var mail = require('./email');
var sms = require('./sms');
var dateDiff = require('../components/dateOperations');
var Verification = models.Verification;
var moment = require('moment');
var lib = require('otplib');
var otp = lib.authenticator;
module.exports ={
    /**
    * @sendVerificationCode
    * this function is used for sending verification code to user via email or sms.
    * @param user | Object | it is an object that contains user's information like email and phone number
    * @param code | String | it is a one time password for verifying account
    **/
    sendVerificationCode: function (user, type){
        // base 32 encoded user secret key
        var secret = otp.generateSecret();
        // otp code
        var code = otp.generate(secret);

        var verification = {
            user: user._id,
            code: code,
            type: type,
            created: moment.utc().format(),
            expired: moment.utc().add(1, "hours").format(),
            status: true
        };
        return Verification.create(verification).then(function(data){
            var sendEmail = mail.verification(user.email, code);
            var sendSms = sms.verification(user.phone_number, code);
            if(sendEmail || sendSms){
                return true;
            }else{
                return true;
            }
        }).catch(function(err){
            return false;
        });
    },
    /**
    * @sendVerificationCode
    * this function is used for sending verification code to user via email or sms.
    * @param uid | objectId | id of user
    * @param code | String | it is one time password for verifying account
    **/
    isVerified: function(uid, code){
        return Verification.findOne({"user": uid, "code": code, expired: {$gt: moment.utc().format()}}).exec();
    },
    /**
    * @setVerificationStatus
    * this function is used for sending verification code to user via email or sms.
    * @param id | objectId | id of verification
    * @param status | Boolean | status that has to be set
    **/
    setVerificationStatus: function(id, status) {
        return Verification.findOneAndUpdate({_id: id}, {status: status}, {"new": true});
    }
};
