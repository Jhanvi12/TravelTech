'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
router
.get('/', function(req, res){
  res.send('welcome');
})
.use('/auth', require('./auth'))
.use('/verify', require('./verify'))
.use('/bids',expressJwt({secret: config.session.secret}),require('./bids'))
.use('/city', require('./city'))
.use('/state', require('./state'))
.use('/users', require('./users'))
.use('/modules', require('./modules'))
.use('/coupons', require('./coupon'))
.use('/notifications', require('./notifications'))
.use('/vehicles',  require('./vehicles'))
.use('/default_vehicle',  require('./default_vehicles'))
.use('/drivers', require('./drivers'))
.use('/feedback', require('./feedback'))
.use('/inventories', require('./inventories'))
.use('/awaytaxi', require('./awaytaxi'))
.use('/ratings', expressJwt({secret: config.session.secret}), require('./ratings'))
.use('/chat', expressJwt({secret: config.session.secret}),require('./chat'))
.use('/documents', expressJwt({secret: config.session.secret}), require('./documents'))
.use('/vehicle_category', require('./vehicle_category'))
.use('/bids', expressJwt({secret: config.session.secret}), require('./bids'))
.use('/Watchlists', expressJwt({secret: config.session.secret}), require('./watch_enquiry'))
.use('/rides', expressJwt({secret: config.session.secret}), require('./rides'))
.use('/bids', expressJwt({secret: config.session.secret}), require('./bids'))
.use('/preferences', expressJwt({secret: config.session.secret}), require('./preferences'));
module.exports = router;
