"use strict";
angular.module("app.admin.preference", [
    'app.preference.services',
    'app.core.services.LocalStorage'
])
        .controller("PreferenceController", ['$scope', '$rootScope', 'PreferenceService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $rootScope, PreferenceService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.admin.token;

                $scope.options = {
                    hstep: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                };

                /** @getPreferences
                 * function used for fetching preferences
                 **/
                $scope.getPreference = function() {
                    PreferenceService.getPreference().then(function(data) {
                        if (data) {
                            $scope.preference = data;
                        }
                    }).catch(function(err) {
                        console.log('Error');
                    });

                }

                /** @editPreference
                 * function used for update preference data
                 **/

                $scope.addPreference = function(preference) {
                    if (preference._id == undefined) {
                        PreferenceService.addPreference(preference).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.preference');
                            $state.go('admin.preference', {}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Preferences added successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    } else {
                        PreferenceService.updatePreference(preference).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.preference');
                            $state.go('admin.preference', {}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Preferences updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    }
                };
            }]);