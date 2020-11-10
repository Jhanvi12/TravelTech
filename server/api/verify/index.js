'use strict';
  var express = require('express');
  var models = require('../../model');  
  var User = models.User;
  var response = require('../../components/response.js');
  var validator = require('validator');
  var router = express.Router();
 
  router
  // code for resend verification code
  .post('/', require('./resendVerificationCode'))
  // code for verify code and activate account
  .put('/', require('./activateUserAccount'))
  // verify operator account
  .put('/:id', require('./approveOperator'));

  module.exports = router;