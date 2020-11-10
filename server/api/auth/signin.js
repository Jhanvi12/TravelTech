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
/**
* this module exports a function that can verify user's username, password and its type
**/
module.exports = function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    authService.CheckUserCredentials(username).then(function(user) {
        //  console.log('user', user)
        if(_.isEmpty(user)){// if user not exists
            return response(res, null, 'Incorrect username & password.', 401);
        }
        else{
            if(passwordHash.verify(password, user.password)){
                if(userRoleEnum.get(req.body.type).value == user.role){
                    if(req.body.device_info){
                        console.log('inside if');
                        return userService.updateUserById(user._id, {device_info: req.body.device_info}).then(function(data){
                            return auth.setToken(req, res, user, 'user logged in', 200);
                        });
                    }else{
                        console.log('inside 1else');
                        return auth.setToken(req, res, user, 'user logged in', 200);
                    }
                }else{
                     console.log('inside else 2');
                        return response(res, null, 'Incorrect username & password.', 401);
                }
            }
            else{ // user entered wrong password
                console.log('inside else 3');
                return response(res, null, 'Incorrect username & password.', 401);
            }
        }
    }).catch(function(err){
        //return done(null, false, { message: err.message, code: 500});
    });
};