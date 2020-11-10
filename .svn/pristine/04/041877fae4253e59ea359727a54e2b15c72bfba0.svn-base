angular.module('app.admin.reset-password', [
    'app.core.services.login',
    'app.core.services.LocalStorage'
])
        .controller('AdminResetPasswordController', ['$scope', '$state', 'LoginService', 'LocalStorageService', 'ngToast', function($scope, $state, LoginService, LocalStorageService, ngToast) {
                $scope.show.navigator = false;
                $scope.admin = {};
                $scope.resetPassword = function() {
                    $scope.admin.email = JSON.parse(sessionStorage.getItem("forgot_admin_email"));
                    LoginService.resetWithCode($scope.admin).then(function(data) {
                        $scope.message = "Verification code sent to your email";
                        $state.go('admin.login');
                    }).catch(function(err) {
                        $scope.message = "Email is incorrect";
                    });
                };
            }]);
