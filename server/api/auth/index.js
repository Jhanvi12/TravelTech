'use strict';
var express = require('express');
var router = express.Router();
var config = require('config');
var response = require('../../components/response.js');
var auth = require('../../components/auth.js');
var passport = require('passport');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for auth
router
.delete('/',  expressJwt({secret: config.session.secret}), require('./logout'), auth.logout)
.post('/signin', require('./signin'))
.post('/signup', require('./signup'))
.post('/forgot-password', require('./forgot-password'))
.put('/reset-password', require('./reset-password'))
.put('/change-password', require('./change-password'));


module.exports = router;
