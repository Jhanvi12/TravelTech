
'use strict';
var model = require('../../model');
var DefaultVehicles = model.DefaultVehicles; // require Vehicle Category model
module.exports = {
    /**
     *get count vehicles list
     **/

    getCount: function(query) {
        if (!query) {
            return DefaultVehicles.find().count();
        } else {
            return DefaultVehicles.find(query).count();
        }
    },
    /**
     *get Vehicle Categories list
     **/
    getDefaultVehicles: function(query) {
        return DefaultVehicles.find(query).populate('category').exec();
    },
    /**
     *get Vehicle Category by its id
     *@param | Id | object id of Vehicle Category
     **/
    getDefaultVehicleById: function(id) {
        return  DefaultVehicles.findOne({"_id": id}).exec();
    },
    /**
     *get VehicleCategory by its id
     *@param | id 		  | objectId | object id of Vehicle Category
     *@param | updateQuery | object   | object contains parameter which has to be update
     **/
    updateDefaultVehicleById: function(id, updateQuery) {
        return  DefaultVehicles.findOneAndUpdate({_id: id}, updateQuery, {"new": true});
    },
    /**
     *get Vehicle Category by its id
     *@param | params | object | contains parameters for creating new Vehicle Category
     **/
    createDefaultVehicle: function(params) {
        return  DefaultVehicles.create(params);
    },
    /**
     *get Vehicle Category by its id
     *@param | Id | object id of Vehicle Category
     **/
    deleteDefaultVehicleById: function(id) {
        return DefaultVehicles.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
    },
    /*Return the cars of same category*/
    getDefaultVehiclesByCategories:function(id){
        return DefaultVehicles.find({"category":id}).populate('category').exec();
    },

    deleteDefaultVehiclesById : function(id){
      return DefaultVehicles.findOneAndUpdate({"_id": id}, {"is_deleted": true}, {"new": true}).exec();
    }

}
