'use strict';
var moment = require('moment');
var config = require('config');
var Enum = require('enum');
var vehicleFeaturesEnum = new Enum(config.seeds.vehcile_features);
module.exports =
{
	marshal: function(vehiclemodel)
	{
		function vehicleImage(imageArray){
			var arr = [];
			imageArray.forEach(function(val){
				arr.push(config.server.baseurl + config.upload.images.main + val);
			});
			return arr;
		}
		function vehicleFeaturesKey(features){
			var arr= [];
			features.forEach(function(val){
				arr.push(vehicleFeaturesEnum.get(val).key);
			});
			return arr;
		}
		return {
	        _id: vehiclemodel._id,
	        operator: vehiclemodel.operator,
	      	type: vehiclemodel.type,
			category: vehiclemodel.category,
			capacity: vehiclemodel.capacity,
			registration_number: vehiclemodel.registration_number,
			cost_per_km: vehiclemodel.cost_per_km,
	  		features: vehicleFeaturesKey(vehiclemodel.features) || [],
	  		images: vehicleImage(vehiclemodel.images),
			created: vehiclemodel.created,
	  		modified: vehiclemodel.modified,
			is_active: vehiclemodel.is_active,
			is_approved: vehiclemodel.is_approved || false
		};
	},

	unmarshal: function(jsonData, picture, uid){
    // function for capitilize first character of string
    function capitilize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
	function vehicleFeaturesValue(features){
		var arr= [];
		features.forEach(function(val){
			arr.push(vehicleFeaturesEnum.get(val).value);
		});
		return arr;
	}
		return {
			operator: uid,
			category: jsonData.category,
			type: jsonData.type,
			registration_number: jsonData.registration_number,
			features: vehicleFeaturesValue(jsonData.features),
			is_approved: jsonData.is_approved || false,
			images: picture || ["default.png"],
			capacity: jsonData.capacity,
			cost_per_km: jsonData.cost_per_km,
			created: moment.utc().format(),
			modified: moment.utc().format()
		};
	}
};
