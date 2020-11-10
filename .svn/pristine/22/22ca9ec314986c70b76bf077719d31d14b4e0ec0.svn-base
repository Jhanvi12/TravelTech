'use strict';

var model = require('../../model');
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var config = require('config');
var userService = require('./service');
var fs = require('fs');


module.exports = function(req, res){
     var bankInfo = {};
     var picture = {};
     var ch
     var picturename = null;
  
     if(typeof req.file == 'object'){
      var picture = req.file;
      console.log('the picture is ',picture);
      if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
        return response(res, null, "invalid cheque type", 422);
      }else{
        var ext = "";
        if(picture.mimetype == 'image/jpeg'){
          ext = ".jpg";
        }else{
          ext = ".png";
        }
        picturename = picture.filename + ext;
        console.log('the picturename is',picturename);
      }
    }
    else if(req.body.cheque != "default" && req.body.cheque != undefined){
      var imgName = req.body.cheque;
       var splitWithoutExt = [];
            var splitImgName = imgName.split('.');
            var sendImgName = splitImgName[0];
            picture.filename = sendImgName;
            picturename = req.body.cheque;
            console.log('teh picturename is',picturename);
    }
    else{
            picture.filename = "default";
            picturename = "default.png";
            console.log('teh picturename is',picturename);
    }

  

  // checking account name
  if(req.body.account_name){
    //validation for vendor account name exists
    if(!validator.isLength(req.body.account_name, 1))
    {
        return response(res, null, "invalid account name", 422);
    }else{
        bankInfo.account_name = req.body.account_name;
    }
  }

  // checking account number
  if(req.body.account_number){
    //validation for vendor bank account number exists
    if(!validator.isNumeric(req.body.account_number, 1))
    {
        return response(res, null, "invalid account number", 422);
    }else{
      bankInfo.account_number = req.body.account_number;
    }
  }

  // checking ifsc code
  if(req.body.ifsc_code){
    //validation for bank ifsc code
    if(!validator.isLength(req.body.ifsc_code, 1))
    {
        return response(res, null, "invalid ifsc code", 422);
    }else{
      bankInfo.ifsc_code = req.body.ifsc_code;
    }
  }

  // checking bank name
  if(req.body.bank_name){
    //validation for bank name
    if(!validator.isLength(req.body.bank_name, 1))
    {
        return response(res, null, "invalid bank name", 422);
    }else{
      bankInfo.bank_name = req.body.bank_name;
    }
  }

  //checking bank branch
  if(req.body.bank_branch)
  {
    //validation for bank branch exists
   if(!validator.isLength(req.body.bank_branch, 1))
   {
       return response(res, null, "invalid bank branch name", 422);
   }else{
     bankInfo.bank_branch = req.body.bank_branch;
   }
  }

  // checking branch address
  if(req.body.branch_address){
    //validation for vendor branch address exists
    if(!validator.isLength(req.body.branch_address, 1))
    {
        return response(res, null, "invalid branch address", 422);
    }else{
      bankInfo.branch_address = req.body.branch_address;
    }
  }
   
  // Adding bank details of user


/*If cheque(file) and data both exists for add and edit function*/ 
   if(req.body && req.file){
    userService.updateUserById(req.params.id,{$set:{bank_info:{cheque:picturename,bank_name:req.body.bank_name,account_name:req.body.account_name,account_number:req.body.account_number,ifsc_code:req.body.ifsc_code,bank_branch:req.body.bank_branch,branch_address:req.body.branch_address}}}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture.filename);
   console.log('picturename',picturename);
   user.bank_info.cheque = config.server.baseurl + config.upload.images.main + picturename;
   var source = config.upload.images.main + picture.filename;
   var path = config.upload.images.main + picturename;

   fs.rename(source, path, function(err){
               if(err){
               console.log('err',err);
                throw err; 
              }
            });
   return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
}
/*At the time of edit of bank info data in operator my profile info(no cheque file)*/
else if(req.body.cheque){
userService.updateUserById(req.params.id,{$set:{bank_info:{cheque:picturename,bank_name:req.body.bank_name,account_name:req.body.account_name,account_number:req.body.account_number,ifsc_code:req.body.ifsc_code,bank_branch:req.body.bank_branch,branch_address:req.body.branch_address}}}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture.filename);
   console.log('picturename',picturename);
   user.cheque = config.server.baseurl + config.upload.images.main + picturename;
   
 return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
  
 

}
/*At the time of sign up of operator (bank info)*/
else{

  userService.updateUserById(req.params.id,{bank_info: bankInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture.filename);
   console.log('picturename',picturename);
   user.cheque = config.server.baseurl + config.upload.images.main + picturename;
   
return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
  

}


};