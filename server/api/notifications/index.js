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
.get('/', require('./all')) // route for getting all notifications
.get('/:id', require('./get'))
.get('/reciever/:id',require('./reciever')) // route for getting notification by reciever id
.post('/',  expressJwt({secret: config.session.secret}), require('./post')) // route for create new notification
.post('/statusUpdate', expressJwt({secret: config.session.secret}), require('./statusUpdate')) // status update route
.post('/delete',  expressJwt({secret: config.session.secret}), require('./delete')); // route for delete notification

module.exports = router;