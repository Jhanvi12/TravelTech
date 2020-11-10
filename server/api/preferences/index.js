'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js'); // require response js for setting headers variables
var auth = require('../../components/auth.js');

// Routes for preference Api
router
.get('/', require('./get')) // route for getting preference
.post('/', require('./post')) // route for update preference
.put('/', require('./put')); // route for update preference

module.exports = router;