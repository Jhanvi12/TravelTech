angular.module('app.admin.login', [
    'app.core.services.login',
    'app.core.services.LocalStorage'
])
        .controller('AdminLoginController', ['$scope', '$state', 'LoginService', 'LocalStorageService', 'ngToast', function($scope, $state, LoginService, LocalStorageService, ngToast) {
                var local = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                if (local) {
                    $state.go('admin.dashboard');
                } else {
                    $state.go('admin.login');
                }
                $scope.show.navigator = false;
                $scope.admin = {};
                $scope.login = function() {
                    $scope.$broadcast('start', true);
                    if (!$scope.admin.type) {
                        $scope.error = "Please select user type";
                    }
                    LoginService.userLogin($scope.admin).then(function(data) {
                        LocalStorageService.set("travel_tech_admin", JSON.stringify(data));
                        $state.go('admin.dashboard');
                        $scope.$broadcast('stop', true);
                    }).catch(function(err) {
                        $scope.$broadcast('stop', true);
                        if (!$scope.admin.type) {
                            $scope.error = "Please select user type";
                        } else {
                            $scope.error = "Either Email or Password is incorrect";
                        }
                    });
                };
            }]);