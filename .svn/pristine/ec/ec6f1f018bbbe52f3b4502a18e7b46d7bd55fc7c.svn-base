// 'use strict';
// var nodemailer = require('nodemailer');

// var mandrillTransport = require('nodemailer-mandrill-transport');
// // create reusable transporter object using SMTP transport
// var transport = nodemailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: 'fXga4pLaVPdJTw3jbQctPQ'
// }
// }));
// function sendmail(options){
//     return transport.sendMail(options, function(err, info) {
//         if (err) {
//             console.error(err);
//             return false;
//         } else {
//             console.log(info);
//             return true;
//         }
//     });
// }

// module.exports = {
//     verification: function(to, code){
//         var subject = "Account Verification";
//         var html = "Please use code below to verify your account with us." +
//         "<br/>" +
//         "<strong>Code: " + code + "</strong>" +
//         "<br/>" +
//         "<p style='font-size:12px;'><b>Note:</b> This code will be expired in next 60 minutes</p>";
//         var options = {
//             from: "info@traveltech.com",
//             to: to,
//             subject: subject,
//             html: html
//         };
//         var a = sendmail(options);
//         return a;
//     },

//     changeAccountSetting: function(to, message){
//         var subject = "Change Account Setting";
//         var html =
//         "<strong>" + message + "</strong>";
//         var options = {
//             from: "info@traveltech.com",
//             to: to,
//             subject: subject,
//             html: html
//         };
//         return sendmail(options);
//     },

//     notification: function(to, message){
//         var subject = "Notification";
//         var html =
//         "<strong>" + message + "</strong>";
//         var options = {
//             from: "info@traveltech.com",
//             to: to,
//             subject: subject,
//             html: html
//         };
//         return sendmail(options);
//     }

// };
// 9th may 2016
'use strict';
var nodemailer = require('nodemailer');

var mandrillTransport = require('nodemailer-mandrill-transport');
var smtpTransport = require('nodemailer-smtp-transport');
// create reusable transporter object using SMTP transport

// var transport = nodemailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: 'fXga4pLaVPdJTw3jbQctPQ'
// }
// }));
// var transport = nodemailer.createTransport(smtpTransport({
//     host: 'mail.smartdatainc.net',
//     port: 25,
//     auth: {
//         user: 'testsdei@smartdatainc.net',
//         pass: 'SDN@smart2013'
//     }
// }));
var transport = nodemailer.createTransport(smtpTransport('smtps://risehospitility%40gmail.com:smartData123456@smtp.gmail.com'));
// var transport = nodemailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: 'fXga4pLaVPdJTw3jbQctPQ'
// }
// }));
// var transport = nodemailer.createTransport(smtpTransport({
//     host: 'mail.smartdatainc.net',
//     port: 25,
//     auth: {
//         user: 'testsdei@smartdatainc.net',
//         pass: 'SDN@smart2013'
//     }
// }));

function sendmail(options){
    return transport.sendMail(options, function(err, info) {
        if (err) {
            console.error(err);
            return false;
        } else {
            console.log(info);
            return true;
        }
    });
}

module.exports = {
    verification: function(to, code){
        var subject = "Account Verification";
        var html = "Please use code below to verify your account with us." +
        "<br/>" +
        "<strong>Code: " + code + "</strong>" +
        "<br/>" +
        "<p style='font-size:12px;'><b>Note:</b> This code will be expired in next 60 minutes</p>";
        var options = {
            from: "info@traveltech.com",
            to: to,
            subject: subject,
            html: html
        };
        var a = sendmail(options);
        return a;
    },

    changeAccountSetting: function(to, message){
        var subject = "Change Account Setting";
        var html =
        "<strong>" + message + "</strong>";
        var options = {
            from: "info@traveltech.com",
            to: to,
            subject: subject,
            html: html
        };
        return sendmail(options);
    },

    notification: function(to, message){
        var subject = "Notification";
        var html =
        "<strong>" + message + "</strong>";
        var options = {
            from: "testsdei@smartdatainc.net",
            to: to,
            subject: subject,
            html: html
        };
        return sendmail(options);
    }

};
