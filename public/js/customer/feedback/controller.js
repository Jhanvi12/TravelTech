angular.module('app.customer.feedback', [
  'app.customer.feedback.service'
 ])
.controller('FeedbackController', ['$scope', '$state', 'FeedbackService', 'ngToast', '$timeout','$stateParams',
function($scope, $state, FeedbackService, ngToast, $timeout,$stateParams){
  // console.log("inside feedback", $stateParams.report);
  $scope.rate ={};
  $scope.rate.vehicle = {};
  $scope.rate.driver = {};
  $scope.rate.operator = {};
  $scope.rate.ride = $stateParams.report.ride;
  // console.log(' $stateParams.report.vehicle_details[0]',  $stateParams.report.vehicle_details[0]);
  // console.log(' $stateParams.report.driver_details[0]',  $stateParams.report.driver_details[0]);
  $scope.rate.vehicle.vehicle_details = $stateParams.report.vehicle_details[0];
  $scope.rate.driver.driver_details = $stateParams.report.driver_details[0];
  $scope.rate.operator.operator_details = $stateParams.report.operator_details;
  $scope.rate.vehicle.rating = 0;
  $scope.rate.driver.rating = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

   $scope.ratingInfo = function(rvehicle,rdriver,rvehiclemessage,rdrivermessage){
     FeedbackService.ratingInfo($scope.rate).then(function(data){
      data.report=$stateParams.report;
        $state.go("customer.myrides");
      }).catch(function(err){
            console.log(err);
      });
    };

}]);
