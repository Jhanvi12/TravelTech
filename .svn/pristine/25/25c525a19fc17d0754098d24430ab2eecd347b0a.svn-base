'use strict';
var model = require('../../model');
var Reviews = model.Reviews; // require city model
module.exports = {
    /**
     * get count
     **/
    getCount: function(query) {
        if (!query) {
            return Reviews.find().count();
        } else {
            return Reviews.find(query).count();
        }
    },
    // /**
    //  * get feedback
    //  **/
    // getFeedback: function(query, offset, limit) {
    //     if (!query) {
    //         return Reviews.find().skip(offset).limit(limit).populate('user_id').populate('ride').populate('driver.driver_details').populate('vehicle.vehicle_details').exec();
    //     } else {
    //         return Reviews.find(query).skip(offset).limit(limit).populate('user_id').populate('ride').populate('driver.driver_details[0]').populate('vehicle.vehicle_details').exec();
    //     }
    // },
       /**
     * get feedback
     **/
    getFeedback: function(query, offset, limit) {
        if (!query) {
            return Reviews.find().skip(offset).limit(limit).populate('user_id').populate('ride').populate('driver.driver_details').populate('vehicle.vehicle_details').exec();
        } else {
            return Reviews.find(query).skip(offset).limit(limit).populate('user_id').populate('ride').populate('driver.driver_details').populate('vehicle.vehicle_details').exec();
        }
    },
    getFeedbackByRideId: function(id) {
        return Reviews.findOne({ride: id});
    },

 /**
    *delete Feedback by its id
    *@param | Id | object id of role
    **/
 deleteFeedbackById : function(id){
      return Reviews.findOneAndUpdate({_id: id, is_deleted: false}, {is_deleted: true}, {"new": true});
  },

    /**
     * Post new feedback
     * @param | params | object | contains parameters for creating new city
     **/
    createFeedback: function(params) {
        console.log("params", params);
        // creating new city
        return Reviews.create(params);
    }
}
