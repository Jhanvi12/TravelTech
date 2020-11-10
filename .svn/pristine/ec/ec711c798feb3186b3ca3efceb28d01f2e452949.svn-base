'use strict';
var model = require('../../model');
var Review = model.Reviews;
var driver = model.Drivers; // require Review Model
var vehicle = model.Vehicles;
var User= model.Users; 


module.exports = {
  
    /**
  *get reviews by its id
  *@param | Id | object id of operator
  **/

      getReviewById : function(id){
      console.log('in service.js',id);
      return Review.find({"is_deleted":false}).populate({path: 'vehicle.vehicle_details',match:{ "operator": id}}).populate({path: 'driver.driver_details',match:{ "operator": id}}).exec();
  },
  /*Get Reviews for all operator*/
      getReviewsOfAllOperator : function(){
       return Review.find({'is_deleted':false});
      }

}
