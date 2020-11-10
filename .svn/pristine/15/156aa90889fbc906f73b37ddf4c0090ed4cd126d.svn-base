var mongoose = require('mongoose');
var validator = require('validator'); // require to put server side validations
var uniqueValidator = require('mongoose-unique-validator');
var emailTemplateschema = mongoose.Schema({
   title:{type:String},
   subject:{type:String},
   description:{type:String},
   code:{type:String,required: 'Please enter the code', unique: true},
   isDeleted:{type:Boolean,default:false}
});
emailTemplateschema.plugin(uniqueValidator, {message: "This code is already exists"});
// module.exports = mongoose.model('emailTemplate',emailTemplateschema);
var emailTemplateObj = mongoose.model('emailTemplate',emailTemplateschema);
module.exports = emailTemplateObj;
