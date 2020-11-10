'use strict';
var express = require('express');
var router = express.Router({mergeParams: true});
var config = require('config');
var auth = require('../../components/auth.js');
var multer  = require('multer');
var upload = multer({ dest: config.upload.images.temp });
/**
*define fields for uploading items
*@param document | file | document related to operators
**/
var cpUpload = upload.fields([{ name: 'document', maxCount: 1 }]);
/**
* Routes for crud operations of driver info
**/
router
.get('/', require('./all')) // getting list route
.get('/:id', require('./get')) // getting details route
.put('/:id', cpUpload, require('./put')) // updating route
.post('/', cpUpload, require('./post')) // create new entry
.post('/statusUpdate', require('./statusUpdate'))
.delete('/:id', require('./delete')) // deleting route
.post('/delete', require('./multidelete')); // deleting route
module.exports = router;
