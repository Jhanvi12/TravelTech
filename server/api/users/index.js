'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');
var multer  = require('multer');
var config = require('config');
var upload = multer({ dest: config.upload.images.main });
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// Routes for Users Api
var cpUpload = upload.fields([{ name: 'id_proof' }, { name: 'id_proof_company'}]);
router
.get('/operatorexportcsv/:search/:cities', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./operatorexportcsv'))
.get('/customerexportcsv', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./customerexportcsv'))
.get('/corporateexportcsv', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./corporateexportcsv'))
.get('/employeesexportcsv', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./employeesexportcsv'))
.get('/', require('./all'))
.get('/:id',require('./get'))
.put('/:id', upload.single('profile_pic'), require('./put'))
.put('/profileUpdate/:id', upload.single('profile_pic'), require('./profileUpdate'))
.post('/', require('./post'))
.put('/:id/personal_info', require('./personal_info'))
.put('/:id/personal_profileinfo',cpUpload,require('./personal_profileinfo'))
.put('/:id/company_info', expressJwt({secret: config.session.secret}), auth.isLoggedIn,  require('./company_info'))
.put('/:id/bank_info',  upload.single('cheque'),require('./bank_info'))
.put('/:id/account_setting', require('./account_setting'))
.post('/statusUpdate', require('./statusUpdate'))
.post('/:id/updateNotificationSetting', expressJwt({secret: config.session.secret}), require('./updateNotificationSetting'))
// .put('/:id/updateNotificationSetting', expressJwt({secret: config.session.secret}), function(req, res){
// 	console.log('route data', req.body);
// })
.post('/delete', expressJwt({secret: config.session.secret}), auth.isAdmin, require('./delete'))
.delete('/:id',expressJwt({secret: config.session.secret}),require('./deletesingle'));

module.exports = router;
