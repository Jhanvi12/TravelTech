"use strict";
angular.module("app.admin.default_vehicle", [
        'app.default_vehicle.services',
        'app.core.services.LocalStorage'
    ])
    .controller("DefaultVehiclesController", ['$scope', '$rootScope', 'default_vehicleService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
        function($scope, $rootScope, default_vehicleService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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

            /** @getCityList
             * function used for fetching all cities list and set into tableParams
             **/
            $scope.getDefaultVehiclesList = function(page, searchQuery) {
                var offset;
                if (!page) {
                    offset = 0;
                } else {
                    offset = ((page - 1) * 10);
                }
                $scope.tableParams = new NgTableParams({}, {
                    counts: [],
                    getData: function() {
                        return default_vehicleService.getDefaultVehicleList(offset, searchQuery).then(function(data) {
                            $scope.currentPage = page ? page : 1;
                            console.log(data.data);
                            $scope.data = data.data;
                            $scope.recordFetchedLength = data.count;
                            var length = data.count;
                            var pageCount = length / 10;
                            var roundPageCount = Math.round(pageCount);
                            var finalPageCount;
                            if (roundPageCount == pageCount) {
                                finalPageCount = roundPageCount;
                            } else {
                                finalPageCount = roundPageCount + 1;
                            }

                            $scope.pagesCount = [];
                            for (var i = 1; i <= finalPageCount; i++) {
                                $scope.pagesCount.push(i);
                            }
                            //multiple checkboxes
                            var simpleList = $scope.data;
                            $scope.checkboxes = {
                                checked: false,
                                items: {}
                            };
                            // watch for check all checkbox
                            $scope.$watch(function() {
                                return $scope.checkboxes.checked;
                            }, function(value) {
                                angular.forEach(simpleList, function(item) {
                                    $scope.checkboxes.items[item._id] = value;
                                });
                            });
                            // watch for data checkboxes
                            $scope.$watch(function() {
                                return $scope.checkboxes.items;
                            }, function(values) {
                                var checked = 0,
                                    unchecked = 0,
                                    total = simpleList.length;
                                angular.forEach(simpleList, function(item) {
                                    checked += ($scope.checkboxes.items[item._id]) || 0;
                                    unchecked += (!$scope.checkboxes.items[item._id]) || 0;
                                });
                                if ((unchecked == 0) || (checked == 0)) {
                                    $scope.checkboxes.checked = (checked == total);
                                }
                                var result = document.getElementsByClassName("select-all");
                                angular.element(result[0]).prop("indeterminate", (checked != 0 && unchecked != 0));
                            }, true);
                            return $scope.data;
                        });
                    }
                });
            };

            if ($stateParams.id) {
                $scope.hidePass = "true";
                $scope.reqPass = "false";
            } else {
                $scope.reqPass = "true";
            }
            /** @getCity
             * function used for fetching city by its id
             **/
            $scope.getDefaultVehicle = function() {
                if ($stateParams.id) {
                    default_vehicleService.getDefaultVehicle($stateParams.id).then(function(data) {
                        if (data) {
                            $scope.vehicle = data;
                        }
                    }).catch(function(err) {
                        console.log('Error');
                    });
                }
            }

            /*Show the value in dropdown box
             */
            $scope.showVehiclesInDropDown = function() {
                default_vehicleService.showVehiclesCategory().then(function(data) {
                    if (data) {
                        $scope.options = data;
                    }
                }).catch(function(err) {
                    console.log('Error');
                });
            };

            /** @addCity
             * function used for adding and updating city
             * @condition if city id is found then this function update city by its id otherwise it will add new city
             **/
            $scope.addDefaultVehicle = function(vehicle) {
                if (vehicle._id == undefined) {
                    default_vehicleService.addNewDefaultVehicle(vehicle).then(function(data) {
                        $scope.$broadcast('start', true);
                        $state.reload('admin.default_vehicle');
                        $state.go('admin.default_vehicle', {}, { reload: true, location: 'replace', inherit: false, notify: true });
                        $scope.message = "Vehicle saved successfully";
                        $scope.$broadcast('stop', true);
                    }).catch(function(err) {
                        $scope.message = err.message;
                    });
                } else {
                    default_vehicleService.updateDefaultVehicle(vehicle).then(function(data) {
                        $scope.$broadcast('start', true);
                        $state.reload('admin.default_vehicle');
                        $state.go('admin.default_vehicle', {}, { reload: true, location: 'replace', inherit: false, notify: true });
                        $scope.message = "Vehicle updated successfully";
                        $scope.$broadcast('stop', true);
                    }).catch(function(err) {
                        $scope.message = err.message;
                    });
                }
            };

            /** @performAction
             * function used for updating selected Vehicle category status and delete it.
             **/
            $scope.performAction = function() {
                var data = $scope.checkboxes.items;
                var records = [];
                var inputJsonString = "";
                var jsonString = "";
                var actionToPerform = "";
                $scope.selectAction = selectAction.value;
                if ($scope.selectAction == "disable") {
                    actionToPerform = false;
                } else if ($scope.selectAction == "enable") {
                    actionToPerform = true;
                } else if ($scope.selectAction == "delete") {
                    actionToPerform = "delete";
                }
                for (var id in data) {
                    if (data[id]) {
                        if (actionToPerform == "delete") {
                            if (jsonString == "") {
                                jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';
                            } else {
                                jsonString = jsonString + "," + '{"_id": "' + id + '", "is_deleted":"true"}';
                            }
                        } else {
                            if (jsonString == "") {
                                jsonString = '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
                            } else {
                                jsonString = jsonString + "," + '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
                            }
                        }
                    }
                }
                inputJsonString = "[" + jsonString + "]";
                console.log("data in", inputJsonString);

                if (actionToPerform == "delete") {
                    default_vehicleService.deleteDefaultVehicle(inputJsonString)
                        .then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.go('admin.default_vehicle', {}, { reload: true, location: 'replace', inherit: false, notify: true });
                            // $scope.getDefaultVehicleList();
                            $scope.message = "Vehicle updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            console.log(err.message);
                            $scope.message = err.message;
                        });
                } else {
                    console.log(inputJsonString);
                    default_vehicleService.statusUpdate(inputJsonString)
                        .then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.go('admin.default_vehicle', {}, { reload: true, location: 'replace', inherit: false, notify: true });
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            console.log(err.message);
                        });
                }
            }

            /** @applyGlobalSearch
             * function used for searching Vehicle Category by its name
             **/
            $scope.applyGlobalSearch = function() {
                $scope.getDefaultVehiclesList(1, $scope.globalSearchTerm);
            };

            /** @refreshData
             * function used for refresh Vehicle Category list and reset search
             **/
            $scope.refreshData = function() {
                $scope.getDefaultVehiclesList(1);
            };
        }
    ]);
