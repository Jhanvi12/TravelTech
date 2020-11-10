'use strict';
var express = require('express');
var router = express.Router();
var response = require('../../components/response.js'); // require response js for setting headers variables
var auth = require('../../components/auth.js');
var config = require('config');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for city Api
router
.get('/', require('./all')) // route for getting all inventories
.get('/:id', require('./get'))
.get('/byoperator/:id', require('./getByOperatorId')) // route for getting inventories by id
.delete('/:id', expressJwt({secret: config.session.secret}),require('./delete')) // route for delete inventories by id
.put('/:id', expressJwt({secret: config.session.secret}), require('./put')) // route for update inventories by id
.post('/', expressJwt({secret: config.session.secret}), require('./post')) // route for create new inventories
.post('/delete', expressJwt({secret: config.session.secret}), require('./delete'))
.post('/deleteall', expressJwt({secret: config.session.secret}), require('./multidelete'));


module.exports = router;
