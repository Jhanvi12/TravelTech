'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js');
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for city Api
router
.get('/', require('./all'))
.get('/ride/:id', require('./getByRide'))
.post('/', expressJwt({secret: config.session.secret}), require('./post'))
.post('/delete',expressJwt({secret: config.session.secret}), auth.isAdmin, require('./multidelete')); // deleting route

module.exports = router;
