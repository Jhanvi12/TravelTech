angular.module('app.reset-password', [
    'app.core.services.login',
    'app.core.services.LocalStorage'
])
.controller('ResetPasswordController', ['$scope', '$state', 'LoginService', 'LocalStorageService', 'ngToast', '$stateParams',
function($scope, $state, LoginService, LocalStorageService, ngToast, $stateParams) {
$scope.user = {};
        $scope.resetPassword = function() {
            $scope.user.email = $stateParams.email;
            LoginService.resetWithCode($scope.user).then(function(data) {
                $scope.message = "Verification code sent to your email";
                $state.go('login');
            }).catch(function(err) {
                $scope.message = "Email is incorrect";
            });
        };
        $scope.goToLogin = function() {
            $state.go('welcome', {modal: 'login'});
        };
    }]);
