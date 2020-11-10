'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for Users Api
router
.post('/', require('./post'))
.get('/', require('./get'))
.get('/:id', require('./getemailtemplatebyid'))
.post('/update', require('./updateemailtemplate'))
.post('/delete/:id', require('./deleteemailtemplatebyid'));

// .post('/delete', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./delete'));

module.exports = router;
