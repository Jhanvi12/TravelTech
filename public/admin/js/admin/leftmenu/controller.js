angular.module('app.admin.leftmenu', [
    'app.core.services.LocalStorage'
])
        .controller('LeftMenuController', ['$scope', 'LocalStorageService', '$state', function($scope, $state, LocalStorageService) {
                if (LocalStorageService.get('travel_tech_admin')) {
                    $scope.admin = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                    $scope.loggedInUser = $scope.admin.profile.name;
                    if ($scope.admin.profile.picture) {
                        $scope.profile_pic = $scope.admin.profile.profile_pic;
                    } else {
                        $scope.profile_pic = "/img/profile_pic.png";
                    }
                }

            }]);
