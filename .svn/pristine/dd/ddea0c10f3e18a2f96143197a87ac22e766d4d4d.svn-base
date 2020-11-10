'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');
var multer  = require('multer');
var config = require('config');
var upload = multer({ dest: config.upload.images.temp });
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for Users Api
router
.get('/:id', require('./all'))
.post('/statusUpdate', require('./statusUpdate'));

module.exports = router;
