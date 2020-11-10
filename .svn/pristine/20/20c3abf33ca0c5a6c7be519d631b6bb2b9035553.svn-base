
angular.module('app.forgot-password', [
    'app.core.services.login'
    ])
.controller('ForgotPasswordController', ['$scope', '$state', 'LoginService', 'ngToast',
function($scope, $state, LoginService, ngToast) {
    $scope.user= {};
        $scope.forgotPassword = function() {
            LoginService.forgotWithEmail($scope.user).then(function(data) {
                $scope.message = "Verification code sent to your email";
                $state.go('resetpassword', {email: $scope.user.email});
            }).catch(function(err) {
                $scope.message = "Email is incorrect";
            });
        };
        $scope.goToLogin = function() {
                $state.go('welcome', {modal: 'login'});
        };
    }]);
