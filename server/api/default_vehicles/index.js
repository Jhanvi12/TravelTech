'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js'); // require response js for setting headers variables
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for vehicle category Api
router
.get('/', require('./all')) // route for getting all vehicle categorys
.get('/:id', require('./get')) // route for getting vehicle category by id
.get('/throughcategory/:id',require('./getcategorycar'))
.put('/:id', expressJwt({secret: config.session.secret}), require('./put')) // route for update vehicle category by id
.post('/',  expressJwt({secret: config.session.secret}), require('./post')) // route for create new vehicle category
.post('/statusUpdate', expressJwt({secret: config.session.secret}), require('./statusUpdate')) // status update route
.post('/delete', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./delete')); // deleting route



module.exports = router;
