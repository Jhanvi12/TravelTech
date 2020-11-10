'use strict';
var express = require('express');
var router = express.Router({mergeParams: true});
var config = require('config');
var auth = require('../../components/auth.js');
var multer  = require('multer');
var upload = multer({ dest: config.upload.images.temp });
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
/**
*define fields for uploading items
*@param profile_pic             | file | driver's image
**/
var cpUpload = upload.fields([{ name: 'profile_pic', maxCount: 1 }, { name: 'dl', maxCount: 1 }, { name: 'verification', maxCount: 1 }]);
/**
* Routes for crud operations of driver info
**/
router
.get('/driverexportcsv', expressJwt({secret: config.session.secret}),require('./driverexportcsv')) // getting list route
.get('/', expressJwt({secret: config.session.secret}),require('./all')) // getting list route
.get('/:id',expressJwt({secret: config.session.secret}), require('./get')) // getting details route
.put('/:id', expressJwt({secret: config.session.secret}),cpUpload, require('./put')) // updating route
.post('/', cpUpload, require('./post')) // create new entry
.post('/statusUpdate', expressJwt({secret: config.session.secret}), require('./statusUpdate')) // status update route
.post('/delete',expressJwt({secret: config.session.secret}), auth.isAdmin, require('./multidelete')) // deleting route
.delete('/:id', expressJwt({secret: config.session.secret}),auth.isOperator, require('./delete')); // deleting route
module.exports = router;
