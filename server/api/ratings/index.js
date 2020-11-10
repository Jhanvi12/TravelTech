'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js'); // require response js for setting headers variables
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

router
.get('/:id', require('./all'))// route for getting rating of operator.
.get('/',require('./ratingop')); //route for getting rating for all operator


module.exports = router;