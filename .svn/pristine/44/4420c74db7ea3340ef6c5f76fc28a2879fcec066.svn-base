'use strict';
var moment = require('moment');
var config = require('config');
var Enum = require('enum');
var documentTypeEnum = new Enum(config.seeds.document_type);
var documentStatusEnum = new Enum(config.seeds.document_status);
module.exports =
{
	marshal: function(documentmodel)
	{
		return {
			_id: documentmodel._id,
			operator: documentmodel.operator,
			driver: documentmodel.driver,
			vehicle: documentmodel.vehicle,
			path: config.server.baseurl + config.upload.images.main + documentmodel.path,
			status: documentStatusEnum.get(documentmodel.status).key,
			type: documentTypeEnum.get(documentmodel.type).key,
			decline_comment: documentmodel.decline_comment,
			created: documentmodel.created,
			modified: documentmodel.modified
		};
	},

	unmarshal: function(jsonData, picture, uid){
		// function for capitilize first character of string
		function capitilize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
		return {
			operator: uid,
			driver: jsonData.driver || null,
            vehicle: jsonData.vehicle || null,
			type: documentTypeEnum.get(jsonData.type).value,
			path: picture || "default.png",
			is_active: jsonData.is_active || false,
			is_deleted: false,
            status: documentStatusEnum.get('pending').value,
			created: moment.utc().format(),
			modified: moment.utc().format()
		};
	}
};
