'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js'); // require response js for setting headers variables
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for coupon Api
router
.get('/', require('./all')) // route for getting all coupons
.get('/:id', require('./get')) // route for getting coupon by id
// .delete('/:id', expressJwt({secret: config.session.secret}),require('./delete')) // route for delete coupon by id
//.put('/:id', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./put')) // route for update coupon by id
.post('/', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./post')) // route for create new coupon
.post('/statusUpdate', require('./statusUpdate'))
.post('/delete', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./delete'));

module.exports = router;
