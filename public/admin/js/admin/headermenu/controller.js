angular.module('app.admin.headermenu', [
])
        .controller('HeaderMenuController', ['$scope', '$state', function($scope, $state) {
                //var user = JSON.parse(localStorage.getItem('TravelTechAppUser'));

                //logout function
                $scope.logout = function() {
                    $state.go('admin.logout');
                };
            }]);
