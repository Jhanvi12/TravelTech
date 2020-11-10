'use strict';
var model = require('../../model');
var User= model.Users; // require User model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator'); // require for put server side validations
var config = require('config');

module.exports = function(req, res){
  var outputJSON = "";
  var errorCount =0;
  var inputData = req.body; 
  console.log('the input data is',inputData);
  inputData.forEach(function(input, index){
   User.findOne({"_id":input.user_id},function(err,user){
        if(err){
          console.log('err',err);
        }else{
            console.log('user ', user);
            var permissions = [];
            user.permissions.forEach(function(item, i){
            permissions[i] = item;
            inputData.forEach(function(inputs){
              if(item._id == inputs._id){
                permissions[i].is_active = inputs.enable;
              }
            });
            if(i+1 == user.permissions.length){
                User.update({'_id':input.user_id},{$set:{'permissions':permissions}}, function(err, data){
                if(err){
                  console.log('12121 ',err);
                }else{
                  console.log('updated');
                  if(index+1 == inputData.length){
                  res.json({'status':200})
                  }
                }
              });
            }
          });
        }

  });
   });
 
};