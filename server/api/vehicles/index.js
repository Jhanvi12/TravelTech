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
* @cpUpload
*define fields for uploading items
*@param picture             | file | driver's image
*@param dl                  | file | driver's driving lisence
*@param police_verification | file | driver's police verification
**/
var cpUpload = upload.fields([{ name: 'images', maxCount: 5 }, { name: 'rc', maxCount: 1}, { name: 'permit', maxCount: 1}]);
/**
* Routes for crud operations of driver info
**/
router
.get('/vehiclesexportcsv', expressJwt({secret: config.session.secret}),require('./vehiclesexportcsv')) // getting list route
.get('/', expressJwt({secret: config.session.secret}), require('./all')) // getting list route
.get('/:id', expressJwt({secret: config.session.secret}), require('./get')) // getting details route
.delete('/:id', expressJwt({secret: config.session.secret}), require('./delete')) // deleting route
.put('/:id', expressJwt({secret: config.session.secret}), cpUpload, require('./put')) // updating route
.post('/', cpUpload, require('./post')) // create new entry
.post('/statusUpdate', expressJwt({secret: config.session.secret}), require('./statusUpdate')) // status update route
.post('/delete', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./multidelete')); // deleting route

module.exports = router;
