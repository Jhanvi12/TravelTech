"use strict";
angular.module("app.admin.listdriver", [
    'app.driver.services',
    'app.core.services.LocalStorage'
])
        .controller("AllDriverController", ['$scope', '$location', 'ngToast', '$rootScope', 'DriverService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope,$location,ngToast, $rootScope, DriverService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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

                var oprid = $stateParams.id;
                /** @getDriverList

                 * function used for fetching all driver list and set into tableParams
                 **/
                $scope.getDriverList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.operatorID = oprid;
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return DriverService.getAllDriverList(offset, searchQuery, oprid).then(function(data) {
                                $scope.currentPage = page ? page : 1;
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
                /** @getDriver
                 * function used for fetching driver by its id
                 **/
                $scope.getDriver = function() {
                    if ($stateParams.id) {
                        DriverService.getDriver($stateParams.id).then(function(data) {
                            if (data) {
                                $scope.driver = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }
                /** @addDriver
                 * function used for adding and updating drivers
                 * @condition if driver's id is found then this function update driver by its id otherwise it create new driver
                 **/
                $scope.addDriver = function(driver) {
                    if (driver._id == undefined) {
                        $scope.driver.profile_pic = $scope.myFile.file;
                        $scope.driver.operator_id = $stateParams.id;
                        DriverService.addNewDriver(driver).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.listdriver');
                            $state.go('admin.listdriver', {id: oprid}, {reload: true, location: 'replace', inherit: false, notify: true});
                            $scope.message = "Driver added successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    } else {
                        if ($scope.myFile) {
                            $scope.driver.profile_pic = $scope.myFile.file;
                        }
                        DriverService.updateDriver(driver).then(function(data) {
                            console.log(data);
                            $scope.$broadcast('start', true);
                            $state.reload('admin.listdriver');
                            $state.go('admin.listdriver', {id: data.operator}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Driver updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    }
                };

                /** @performAction
                 * function used for updating selected user's status and delete him.
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
                        DriverService.deleteDriver(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getDriverList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else {
                        DriverService.statusUpdateDriver(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getDriverList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                }
                /** @applyGlobalSearch
                 * function used for searching drivers by its name
                 **/
                $scope.applyGlobalSearch = function() {
                    $scope.getDriverList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh driver list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getDriverList(1);
                };

                $scope.driverexportcsv = function() {
                        DriverService.driverexportcsv().then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/driverfile.csv');
                                }
                                // $scope.filename="driverfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };


            }]);
