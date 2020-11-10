'use strict';
var model = require('../../model');
var mail = require('../../components/email');  // require email component
var sms = require('../../components/sms');  // require sms component
var User = model.User; // require user model
var response = require('../../components/response'); // require response js for setting headers variables
var verify = require('../../components/verification');
var validator = require('validator');// require for put server side validations
var config = require('config');
var userService = require('./service');
var passwordHash = require('password-hash');
var moment = require('moment');
var Enum = require('enum');
var userRoleEnum = new Enum(config.seeds.roles);
var modulesEnum = new Enum(config.seeds.modules);
var fs = require('fs');


module.exports = function(req, res){

 var personalInfo = {};
     var picture = {};
     var picturename = null;

      if(req.body.id_proof != "default" && req.body.id_proof != undefined){
    	console.log('when id prrof in body');
      var imgName =req.body.id_proof ;
       var splitWithoutExt = [];
            var splitImgName = imgName.split('.');
            var sendImgName = splitImgName[0];
            picture.filename = sendImgName;
            picturename =  req.body.id_proof ;
            console.log('teh picturename is',picturename);
    }
    
    else if(typeof req.files.id_proof[0] == 'object'){
     	console.log('when id prrof in file');
      var picture = req.files.id_proof[0];
      console.log('the picture is ',picture);
      if(picture.mimetype != 'image/jpeg' && picture.mimetype != 'image/png'){
        return response(res, null, "invalid id type", 422);
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
   
    else{   
    	    console.log('whrn nothing');
            picture.filename = "default";
            picturename = "default.png";
            console.log('teh picturename is',picturename);
    }

    /*Validation  For Id proof company*/
     var picture_company = {};
     var picturename_company = null;

    if(req.body.id_proof_company != "default" && req.body.id_proof_company != undefined){
      var imgName1 = req.body.id_proof_company ;
       var splitWithoutExt1 = [];
            var splitImgName1 = imgName1.split('.');
            var sendImgName1 = splitImgName1[0];
            picture_company.filename = sendImgName1;
            picturename_company = req.body.id_proof_company ;
            console.log('teh picturename is',picturename_company);
    }
    
    else if(typeof req.files.id_proof_company[0] == 'object'){
      var picture_company = req.files.id_proof_company[0];
      console.log('the picture is ',picture_company);
      if(picture_company.mimetype != 'image/jpeg' && picture_company.mimetype != 'image/png'){
        return response(res, null, "invalid id type", 422);
      }else{
        var ext = "";
        if(picture_company.mimetype == 'image/jpeg'){
          ext = ".jpg";
        }else{
          ext = ".png";
        }
        picturename_company = picture_company.filename + ext;
        console.log('the picturename is',picturename_company);
      }
    }
    
    else{
            picture_company.filename = "default";
            picturename_company = "default.png";
            console.log('teh picturename is',picturename_company);
    }



/*Making Data to save*/
personalInfo = req.body;
personalInfo.id_proof = picturename;
personalInfo.id_proof_company = picturename_company;
personalInfo.operating_location = JSON.parse(personalInfo.operating_location);
personalInfo.home_location = JSON.parse(personalInfo.home_location);
personalInfo.pan_number = JSON.parse(personalInfo.pan_number);
personalInfo.service_tax_number = JSON.parse(personalInfo.service_tax_number);
console.log('personalInfo final to be saved',personalInfo)
console.log('req.files ', req.files);
if(req.body && req.files){
	console.log('case 1');
userService.updateUserById(req.params.id, {operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!

  if(req.files && req.files.id_proof && req.files.id_proof[0]){ 
  	console.log('req.files.id_proof[0]',req.files.id_proof[0])
     user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;
     var source = config.upload.images.main + picture.filename;
     var path = config.upload.images.main + picturename;
      fs.rename(source, path, function(err){
               if(err){
               console.log('err',err);
                throw err; 
              }
            });
  }
  else
  {
  	 user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;
  }
console.log(user.operator_info.id_proof);

if(req.files && req.files.id_proof_company &&  req.files.id_proof_company[0]){
		console.log('req.files.id_proof_company[0]',req.files.id_proof_company[0])
     user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
     var source1 = config.upload.images.main + picture_company.filename;
     var path1 = config.upload.images.main + picturename_company;
     fs.rename(source1, path1, function(err){
               if(err){
               console.log('err',err);
                throw err; 
              }
            });
 }
 else{
 	  user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
 }
 console.log( user.operator_info.id_proof_company);
   return  response(res, user,  "user record updated", 200);
    }).catch(function(err){
   return  response(res, null,  err.message, 500);
    });
}

else if(req.body && req.files.id_proof[0]){
userService.updateUserById(req.params.id, {operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
     user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;
     var source = config.upload.images.main + picture.filename;
     var path = config.upload.images.main + picturename;
      fs.rename(source, path, function(err){
               if(err){
               console.log('err',err);
                throw err; 
              }
            });

  user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
    
   return  response(res, user,  "user record updated", 200);
    }).catch(function(err){
   return  response(res, null,  err.message, 500);
    });

}
else if(req.body && req.files.id_proof_company[0]){
userService.updateUserById(req.params.id, {operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
    user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;
    user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
     var source1 = config.upload.images.main + picture_company.filename;
     var path1 = config.upload.images.main + picturename_company;
     fs.rename(source1, path1, function(err){
               if(err){
               console.log('err',err);
                throw err; 
              }
            });
    
   return  response(res, user,  "user record updated", 200);
    }).catch(function(err){
   return  response(res, null,  err.message, 500);
    });

}
else if(req.body.id_proof){
  console.log('case2')
  userService.updateUserById(req.params.id,{operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture.filename);
   console.log('picturename',picturename);
   user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;

   
 return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
  
 

}
else if(req.body.id_proof_company){
  console.log('case3')
  userService.updateUserById(req.params.id,{operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture_company.filename);
   console.log('picturename',picturename_company);
   user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
   
 return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
  
 

}
else if(req.body.id_proof_company && req.body.id_proof){
  console.log('case4');
  userService.updateUserById(req.params.id,{operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture_company.filename);
   console.log('picturename',picturename_company);
   user.operator_info.id_proof = config.server.baseurl + config.upload.images.main + picturename;
   user.operator_info.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
   
 return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
  
 

}
/*When the id proof will come in body*/
else{
	console.log('case 5');
	userService.updateUserById(req.params.id,{operator_info:personalInfo}).then(function(user){
   if(!user){
     return response(res, null,  "Failed", 500);
   }
   // updated!
   console.log('picture.filename',picture.filename);
   console.log('picturename',picturename);
   user.id_proof = config.server.baseurl + config.upload.images.main + picturename;
   user.id_proof_company = config.server.baseurl + config.upload.images.main + picturename_company;
   
 return  response(res,user,  "user record updated", 200);
}).catch(function(err){

   return  response(res, null,  err.message, 500);
 });
}

}