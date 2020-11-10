'use strict';

var _ = require('lodash');
var model = require('../../model');
var User = model.User;
var validator = require('validator');
var passwordHash = require('password-hash');
var authService = require('./service');
var auth = require('../../components/auth.js');
var response = require('../../components/response.js');
var config = require('config');
var Enum = require('enum');
var userService = require('../users/service');
var userRoleEnum = new Enum(config.seeds.roles);

module.exports = function(req, res){
    if(req.body.device_info){
        return userService.updateUserById(req.user.uid, {device_info: null}).then(function(data){
            next();
        }).catch(function(err){
            return done(null, false, { message: err.message, code: 500});
        });
    }else{
        next();
    }

};
