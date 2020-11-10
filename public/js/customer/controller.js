angular.module('app.customer', [
  'app.core.services.LocalStorage',
  'app.customer.notifications.service',
])
.controller('CustomerController', ['$scope','$rootScope', '$state', 'LocalStorageService', '$stateParams', '$http','NotificationCustomerService',
function($scope,$rootScope, $state, LocalStorageService, $stateParams, $http,NotificationCustomerService){
     if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("welcome");
    }
    /**
    * Showing navigation if user is logged in else hide it.
    **/
    if(JSON.parse(LocalStorageService.get('travel_tech_user'))){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(LocalStorageService.get('travel_tech_user')).token;
    }
    $scope.show = {};
    $scope.state = {};
    $scope.state.name= $state.current.name;
    $scope.show.navigator = LocalStorageService.isLogin('travel_tech_user');
    $scope.LoggedInUser = JSON.parse(LocalStorageService.get('travel_tech_user')).profile;
    $state.go('customer.createRide');
    //logout function
    $scope.logout = function(){
        $state.go('logout',{state: 'customer'});
    };

 $scope.getNotifications = function() {
    console.log('the desired one called');
                NotificationCustomerService.getNotifications($scope.LoggedInUser.uid).then(function(data) {
                 
                    $scope.notifications = data;
                    $scope.notificationscount = data.length;
                       $rootScope.notcount = data.length;
                       $rootScope.notdesc = data;
                    console.log("the result is ", $scope.notifications);
                })
            }


}]);
