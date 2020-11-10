angular.module('app.admin.profile', [
    'app.core.services.LocalStorage',
    'app.profile.service'
])
        .controller('AdminProfileController', ['$scope', 'LocalStorageService', 'ProfileService', '$state', '$http', function($scope, LocalStorageService, ProfileService, $state, $http) {
                $scope.admin = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                if (!LocalStorageService.isLogin('travel_tech_admin')) {
                    $state.go('admin.login');
                } else {
                    $scope.loggedInUser = $scope.admin.profile.name;
                    if ($scope.admin.profile.picture) {
                        $scope.profile_pic = $scope.admin.profile.profile_pic;
                    } else {
                        $scope.profile_pic = "/img/profile_pic.png";
                    }
                }
                ;
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.admin.token;

                ProfileService.getProfile($scope.admin.profile.uid).then(function(data) {
                    if (data) {
                        $scope.user = data;
                    }
                }).catch(function(err) {
                    console.log('Error');
                });

                $scope.updateProfile = function(user) {
                    if ($scope.myFile) {
                        $scope.user.profile_pic = $scope.myFile.file;
                    }                    
                    ProfileService.updateProfile(user).then(function(data) {
                        $scope.user = data;
                        $scope.message = "Profile updated successfully";
                        $state.go('admin.dashboard');
                    }).catch(function(err) {
                        $scope.message = "Profile could not updated.";
                    });
                };
            }]);