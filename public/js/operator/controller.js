angular.module('app.operator', [
    'app.core.services.LocalStorage',
    'app.operator.notifications.service',
])
.controller('OperatorController', ['$scope', '$rootScope', '$state', '$stateParams', 'LocalStorageService', '$http','NotificationoperatorService',
function($scope, $rootScope, $state, $stateParams, LocalStorageService, $http,NotificationoperatorService){

    $scope.show = {};

    $scope.show.menu = false;
    $scope.state = {};
    $scope.state.name = $state.current.name;
   // console.log('you get the type',$stateParams.type);
    $scope.is_loggedIn = JSON.parse(LocalStorageService.isLogin('travel_tech_user'));
    // $scope.LoggedInUser = JSON.parse(LocalStorageService.get('travel_tech_user')).profile;

    if(JSON.parse(LocalStorageService.get('travel_tech_user'))){
        if(JSON.parse(LocalStorageService.get('travel_tech_user')).profile.is_approved){
            $scope.show.is_approved = true;
        }else{
            $scope.show.is_approved = false;
        }
    }else{
        $scope.show.is_approved = false;
    }
    $scope.user = JSON.parse(LocalStorageService.get('travel_tech_user'));
    if(!$scope.is_loggedIn && $stateParams.type != 'operator'){
        $state.go('operator.login');
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');

    }else if(!$scope.is_loggedIn && $stateParams.type == 'operator'){
        $state.go('operator.signupstep2');

    }else{
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(LocalStorageService.get('travel_tech_user')).token;
        $scope.user = JSON.parse(LocalStorageService.get('travel_tech_user'));
       // $scope.approveStatus =  $scope.user ? $scope.user.profile.is_approved : false;
 }

        //logout of operator
        $scope.logout = function(){
            LocalStorageService.delete("travel_tech_user");
            $scope.state.name='operator.login';
            $state.go('operator.login');
        };

     $scope.getNotifications = function() {
               NotificationoperatorService.getNotificationForHeader(JSON.parse(LocalStorageService.get('travel_tech_user')).profile.uid).then(function(data) {
                    $scope.notifications = data;
                    $scope.notificationscount = data.length;
                       $rootScope.notcount = data.length;
                       $rootScope.notdesc = data;
                    console.log("the result is ", $scope.notifications);
                })
            };

}]);