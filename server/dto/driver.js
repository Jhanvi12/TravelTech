'use strict';
var moment = require('moment');
var config = require('config');
module.exports =
{
	marshal: function(drivermodel)
	{
		return {
			_id: drivermodel._id,
			operator: drivermodel.operator,
			name: drivermodel.name,
			phone_number: drivermodel.phone_number,
			profile_pic: config.server.baseurl + config.upload.images.main + drivermodel.profile_pic,
			created: drivermodel.created,
			modified: drivermodel.modified,
			is_active: drivermodel.is_active,
			is_approved: drivermodel.is_approved
		};
	},

	unmarshal: function(jsonData, picture, uid){
		// function for capitilize first character of string
		function capitilize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
		return {
			operator: uid,
			name: jsonData.name ? capitilize(jsonData.name) : null,
			phone_number: jsonData.phone_number,
			profile_pic: picture || "default.png",
			is_active: jsonData.is_active || false,
			is_deleted: false,
			created: moment.utc().format(),
			modified: moment.utc().format()
		};
	}
};
