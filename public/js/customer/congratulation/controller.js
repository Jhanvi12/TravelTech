angular.module('app.customer.congratulation', [
  'app.customer.congratulation.service',
  'app.core.services.LocalStorage',
  // 'app.core.services.city',
  // 'app.core.service.vehicleCategories',
  // 'vsGoogleAutocomplete'
 ])
.controller('CongratulationController', ['$scope', '$state',  'CongratulationService', 'LocalStorageService',
function($scope, $state,  CongratulationService,   LocalStorageService){

  $scope.ride = JSON.parse(sessionStorage.getItem("travel_tech_ride")) || {};
  if(!$scope.ride.routes){
      $scope.ride.route = [];
  }
    if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("welcome");
    }
    /**
    * @submitRide
    * function for saving the ride details entered by User
    **/

  

}]);
