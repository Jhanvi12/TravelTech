'use strict';
var response = require('./response');
var config = require('config');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
module.exports =
{
  setToken: function(req, res, data, msg, code){
    code = code || 200;
    var profile = {};
    profile.uid = data._id;
    profile.is_approved = data.is_approved;
    profile.is_active = data.is_active;
    profile.role = data.role;
    profile.roleKey = userRoleEnum.get(data.role).key;
    profile.email = data.email;
    profile.name = data.name;
    profile.picture = data.profile_pic;
    profile.profile_pic = config.server.baseurl + config.upload.images.main + data.profile_pic;
    var token = jwt.sign(profile, config.session.secret);
    var user = {};
    user.token = token;
    user.profile = profile;
    return response(res, user, "logged in", 200);
  },
  isLoggedIn: function(req, res, next){
    if(req.user.uid){
      next();
    }
    else{
      return response(res, null, "unauthorised request", 401);
    }
  },
  isActive: function(req, res, next){
    if(req.user.is_active){
      next();
    }
    else{
      return response(res, null, "your account is not active", 403);
    }
  },
  isApproved: function(req, res, next){
    if(req.user.is_approved){
      next();
    }
    else{
      return response(res, null, "your account is not approved", 403);
    }
  },
  isAdmin: function(req, res, next){
    if(userRoleEnum.get('admin').value == req.user.role || userRoleEnum.get('employee').value == req.user.role){
        next();
    }
    else{
      return response(res, null, "unautherised request", 401);
    }
  },
  isOperator: function(req, res, next){
    if(userRoleEnum.get('operator').value == req.user.role){
      next();
    }
    else{
      return response(res, null, "unautherised request", 401);
    }
  },
  isCustomer: function(req, res, next){
    if(userRoleEnum.get('customer').value == req.user.role){
      next();
    }
    else{
      return response(res, null, "unautherised request", 401);
    }
  },
  logout: function(req, res){
    if(req.user.uid){
      req.user = {};
    }
    else{
      return response(res, null, "unautherised request", 401);
    }
  }
};
