'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// Routes for Bid Api
router
.get('/bidsexportcsv', expressJwt({secret: config.session.secret}),require('./bidsexportcsv')) // getting list route
.get('/', require('./all')) // route for getting all rides
.get('/foroperator/:id', require('./getbidsbyoperator')) // route for getting all rides
.get('/lowestbid/:id',require('./lowestbid'))
.get('/:id', require('./get')) // route for getting bid by id
.put('/:id', require('./put')) // route for update bid by id
.delete('/:id', require('./delete'))//for deleting the bid
.post('/deleteall', require('./deleteall'))
.put('/fordriver/:id',require('./fordriver'))
.post('/', require('./post')) // route for create new bid
.put('/update_status/:id', require('./update_status')); // route for update bid status by id
module.exports = router;
