'use strict';
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');
var chatservice = require('./service.js');
var Q = require('q');
var io = require('socket.io');
module.exports = function(io) {
    console.log("in io function");
    io.on('connection', function(socket) {
        socket.on('message', function(from, msg) {
            console.log('recieved message from',
                from, 'msg', JSON.stringify(msg));
            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });
            console.log('broadcast complete');
        });

    });

};
