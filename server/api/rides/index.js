'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// Routes for Ride Api
router
.get('/upcomingridesexportcsv', expressJwt({secret: config.session.secret}),require('./upcomingridesexportcsv')) // getting list route
.get('/cancelledridesexportcsv', expressJwt({secret: config.session.secret}),require('./cancelledridesexportcsv')) // getting list route
.get('/completedridesexportcsv', expressJwt({secret: config.session.secret}),require('./completedridesexportcsv')) // getting list route
.get('/noshowridesexportcsv', expressJwt({secret: config.session.secret}),require('./noshowridesexportcsv')) // getting list route
.get('/openleadsexportcsv', expressJwt({secret: config.session.secret}),require('./openleadsexportcsv')) // getting list route
.get('/', require('./all'))
.get('/:id', require('./get'))
.post('/delete', require('./delete'))
.put('/:id', require('./put'))
// .post('/', auth.isCustomer, require('./post'));
.post('/', require('./post'));

module.exports = router;
