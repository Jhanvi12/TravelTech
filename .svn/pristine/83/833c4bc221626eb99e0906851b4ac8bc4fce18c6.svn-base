angular.module('app.operator.completeRides', [
  'app.operator.completeRides.service',
  'app.core.services.LocalStorage',
  // 'app.core.services.city',
  // 'app.core.service.vehicleCategories',
  // 'vsGoogleAutocomplete'
 ])
.controller('completeRidesController', ['$scope', '$state',  'completeRidesService', 'LocalStorageService',
function($scope, $state,  completeRidesService,   LocalStorageService){
      if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("operator.login");
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');

    }
    
  $scope.ride = JSON.parse(sessionStorage.getItem("travel_tech_ride")) || {};
  if(!$scope.ride.routes){
      $scope.ride.route = [];
  }

    /**
    * @submitRide
    * function for saving the ride details entered by User
    **/

  

}]);
