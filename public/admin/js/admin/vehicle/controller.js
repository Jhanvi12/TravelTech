"use strict";
angular.module("app.admin.vehicle", [
    'app.vehicle.services',
    'app.core.services.LocalStorage'
])
        .controller("VehicleController", ['$scope', '$rootScope', 'VehicleService', 'LocalStorageService', 'NgTableParams', '$uibModal', '$stateParams', '$state', '$http',
            function($scope, $rootScope, VehicleService, LocalStorageService, NgTableParams, $uibModal, $stateParams, $state, $http) {
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
                var oprid = $stateParams.id;
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.admin.token;
  
                /** @getVehicleList
                 
                 * function used for fetching all vehicle list and set into tableParams
                 **/
                $scope.getVehicleList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.operatorID = oprid;
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return VehicleService.getVehicleList(offset, searchQuery, $stateParams.id).then(function(data) {
                                if (data) {
                                    angular.forEach(data.data, function(value) {
                                        var featuresString = "";
                                        angular.forEach(value.features, function(item, key) {
                                            if (item != "false") {
                                                var comma = (key != 0) ? ", " : " ";
                                                featuresString = featuresString + comma + item;
                                            }
                                        });
                                        value.featuresString = featuresString;
                                    });
                                    data = data;
                                }
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
                                    var checked = 0, unchecked = 0,
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
                        }});
                };

                if ($stateParams.id) {
                    $scope.hidePass = "true";
                    $scope.reqPass = "false";
                }
                else {
                    $scope.reqPass = "true";
                }

                /** @getVehicle
                 * function used for fetching vehicle by its id
                 **/
                $scope.getVehicle = function() {
                    if ($stateParams.id) {
                        VehicleService.getVehicle($stateParams.id).then(function(data) {
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
                    VehicleService.showVehiclesCategory().then(function(data) {
                        if (data) {
                            $scope.options = data;
                        }
                    }).catch(function(err) {
                        console.log('Error');
                    });
                };
                /** @addVehicle
                 * function used for adding and updating vehicles
                 * @condition if vehicle's id is found then this function update vehicle by its id otherwise it create new vehicle
                 **/
                $scope.myFile = {};
                $scope.addVehicle = function(vehicle) {
                    if (vehicle._id == undefined) {

                        $scope.vehicle.images = $scope.myFile.file;
                        $scope.vehicle.rc = $scope.myFile.rc;
                        $scope.vehicle.permit = $scope.myFile.permit;
                        $scope.vehicle.operator = $stateParams.id;
                        console.log(vehicle);
                        VehicleService.addNewVehicle(vehicle).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.vehicle');
                            $state.go('admin.vehicle', {id: oprid}, {reload: true, location: 'replace', inherit: false, notify: true});
                            $scope.message = "Vehicle added successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    } else {
                        if ($scope.myFile.file) {
                            $scope.vehicle.images = $scope.myFile.file;
                        }
                        if ($scope.myFile.rc) {
                            $scope.vehicle_info.rc = $scope.myFile.rc;
                        }
                        if ($scope.myFile.permit) {
                            $scope.vehicle_info.permit = $scope.myFile.permit;
                        }
                        console.log(vehicle);
                        VehicleService.updateVehicleInfo(vehicle).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.vehicle');
                            $state.go('admin.vehicle', {id: data.operator}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Vehicle updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    }
                };

                /** @performAction
                 * function used for updating selected vehicle's status and delete them.
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
                    }
                    else if ($scope.selectAction == "enable") {
                        actionToPerform = true;
                    }
                    else if ($scope.selectAction == "approve") {
                        actionToPerform = "approve";
                    }
                    else if ($scope.selectAction == "delete") {
                        actionToPerform = "delete";
                    }
                    for (var id in data) {
                        if (data[id]) {
                            if (actionToPerform == "delete") {
                                if (jsonString == "") {
                                    jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "is_deleted":"true"}';
                                }
                            } else if (actionToPerform == "approve") {
                                if (jsonString == "") {
                                    jsonString = '{"_id": "' + id + '", "is_approved":"true"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "is_approved":"true"}';
                                }
                            }
                            else {
                                if (jsonString == "") {
                                    jsonString = '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
                                }
                            }
                        }
                    }
                    inputJsonString = "[" + jsonString + "]";
                    if (actionToPerform == "delete") {
                        VehicleService.deleteVehicle(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getVehicleList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else {
                        VehicleService.statusUpdateVehicle(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getVehicleList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                }
                /** @applyGlobalSearch
                 * function used for searching Vehicles by its name
                 **/
                $scope.applyGlobalSearch = function() {
                    $scope.getVehicleList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh Vehicle list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getVehicleList(1);
                };

                $scope.open = function(images) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'js/admin/document/views/view_image_modal.html',
                        controller: 'VeiwImageController',
                        resolve: {
                            images: function() {
                                return images;
                            }
                        }
                    });
                    modalInstance.result.then(function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.openImageModal = function(images) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'js/operator/myprofile/views/show_array_images.html',
                        controller: 'VeiwArrayImageController',
                        resolve: {
                            images: function() {
                                return images;
                            }
                        }
                    });
                    modalInstance.result.then(function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };
            }]);