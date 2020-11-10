angular.module('app.admin.forgot-password', [
    'app.core.services.login',
    'app.core.services.LocalStorage'
])
        .controller('AdminForgotPasswordController', ['$scope', '$state', 'LoginService', 'LocalStorageService', 'ngToast', function($scope, $state, LoginService, LocalStorageService, ngToast) {
                $scope.show.navigator = false;
                $scope.admin = {};
                $scope.forgotPassword = function() {
                    LoginService.forgotWithEmail($scope.admin).then(function(data) {
                        sessionStorage.setItem("forgot_admin_email", JSON.stringify($scope.admin.email));
                        $scope.message = "Verification code sent to your email";
                        $state.go('admin.reset-password');
                    }).catch(function(err) {
                        $scope.message = "Email is incorrect";
                    });
                };
            }]);
