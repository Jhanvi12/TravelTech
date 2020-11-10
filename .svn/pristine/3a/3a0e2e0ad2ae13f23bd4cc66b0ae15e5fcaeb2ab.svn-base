'use strict';
/**
******
Send Sms functionality
******
**/
var client = require('twilio')('ACcd85a8999626834e6175043e9baba8f1', '754585a4206882bc3000688775569033');
var config = require('config');
var request = require('request');
// function sendSms(options){
//   //Send an SMS text message
//   client.messages.create(options, function(err, responseData) { // callback function
//     console.log(err);
//       if (!err) {
//         return true; // return true on success.
//       }else{
//         return false; // return false on failure.
//       }
//   });
// }

function sendSmsViaInstantalerts(message, to){
    var host = 'http://instantalerts.co/api/web/send?apikey='+config.seeds.sms.apikey+'&sender='+config.seeds.sms.sender+'&to='+to+'&message=Your+One+Time+Password+is+'+message;
    console.log("host",host);
    return request.get(host).on('response', function(response, body) {
        return true;
    })
}
module.exports = {
  // function for sending sms verifications
    verification: function(to, code){

        var msg = code + " is the OTP. Please enter this to verify your identity." +
                  "it will be valid for next 1 hour.";
        var options = {
                to: to,
                from: "+12017304558",
                body: msg
            };
            return sendSmsViaInstantalerts(code, to);
        },

    notification: function(to, message){
        var msg = "Your document has been declined by the admin for the reason: "+ message;
        var options = {
                to: to,
                from: "+12017304558",
                body: msg
            };
            return sendSmsViaInstantalerts(msg, to);
        }
};
