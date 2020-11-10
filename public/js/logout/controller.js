angular.module('app.logout', [
  'app.core.services.logout',
  'app.core.services.LocalStorage'
])
.controller('LogoutController', ['$scope', '$state', 'LogoutService', '$stateParams', 'LocalStorageService',
function($scope, $state, LogoutService, $stateParams, LocalStorageService){
    /**
    * calling logout api route
    **/
    $scope.state = $stateParams.state;
    LogoutService.logout().then(function(data){
        LocalStorageService.delete('travel_tech_user');
        $state.go('welcome', {modal: "login"});
    }).catch(function(err){
        LocalStorageService.delete('travel_tech_user');
        $state.go('welcome', {modal: "login"});
    });

}]);
