angular.module('app.admin', [
    'app.core.services.LocalStorage'
])
        .controller('AdminController', ['$scope', '$state', 'LocalStorageService', '$http', function($scope, $state, LocalStorageService, $http) {
                /**
                 * Showing navigation if user is logged in else hide it.
                 **/
                // $http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(LocalStorageService.get('travel_tech_admin')).token;
                $scope.show = {};
                $scope.show.navigator = LocalStorageService.isLogin('travel_tech_admin');
                if ($scope.show.navigator) {
                    $state.go('admin.dashboard');
                } else {
                    $state.go('admin.login');
                }
            }]);
