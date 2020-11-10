"use strict";
angular.module("app.admin.operator", [
    'app.operator.services',
    'app.core.services.LocalStorage'
])
        .controller("OperatorController", ['$scope', '$location', 'ngToast', '$rootScope', 'OperatorService', 'LocalStorageService', 'NgTableParams', '$uibModal', '$stateParams', '$state', '$http','CityService',
            function($scope, $location, ngToast, $rootScope, OperatorService, LocalStorageService, NgTableParams, $uibModal, $stateParams, $state, $http, CityService) {
                $scope.admin = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                if (!LocalStorageService.isLogin('travel_tech_admin')) {
                    console.log("In condition");
                    $state.go('admin.login');
                } else {
                    $scope.loggedInUser = $scope.admin.profile.name;
                    console.log("the operator is",$scope.loggedInUser);
                    if ($scope.admin.profile.picture) {
                        $scope.profile_pic = $scope.admin.profile.profile_pic;
                    } else {
                        $scope.profile_pic = "/img/profile_pic.png";
                    }
                }

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.admin.token;
                /** @getOperatorList

                 * function used for fetching all operators list and set into tableParams
                 **/
                $scope.getOperatorList = function(page, searchQuery, cities) {
                    console.log("ssdfff",cities);
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return OperatorService.getOperatorList(offset, searchQuery, cities).then(function(data) {
                                console.log("cities",cities);
                                $scope.currentPage = page ? page : 1;
                                $scope.data = data.data;
                                $scope.citynames= data.data.operator_info;
                                console.log("operator data",$scope.data);
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

                        return CityService.getCityList().then(function(data) {
                            $scope.citiesList = data.data;
                            console.log("$scope.citiesList",$scope.citiesList);

                        });

                };

                if ($stateParams.id) {
                    $scope.hidePass = "true";
                    $scope.reqPass = "false";
                }
                else {
                    $scope.reqPass = "true";
                }

                $scope.getCities = function(data) {
                    var cities = "";
                    for(var i in data) {
                        cities += data[i].city+"\n";
                    }
                    return cities;
                }
                /** @getOperator
                 * function used for fetching operator by its id
                 **/
                $scope.getOperator = function() {
                    if ($stateParams.id) {
                        OperatorService.getOperator($stateParams.id).then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }
                /** @addOperator
                 * function used for adding and updating operators
                 * @condition if user's id is found then this function update user by its id otherwise it create new operator
                 **/
                $scope.addOperator = function(user) {
                    user.type = 'operator';
                    user.address.country = 'India';
                    if (user._id == undefined) {
                        OperatorService.addNewOperator(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.operator');
                            $state.go('admin.operator', {}, {reload: true, location: 'replace', inherit: false, notify: true});
                            $scope.message = "Operator updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    } else {
                        OperatorService.updateOperator(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.operator');
                            $state.go('admin.operator', {}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Operator updated successfully";
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
                                    jsonString = '{"_id": "' + id + '", "is_approved":"true","rating":null}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "is_approved":"true","rating":null}';
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
                        OperatorService.deleteOperator(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getOperatorList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else if (actionToPerform == 'approve') {
                        console.log("in approve");
                        var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'js/admin/operator/views/rating.html',
                            controller: 'RatingDemoCtrl',
                        });
                        modalInstance.result.then(function(value) {
                            var valueString = jsonString.replace(/null/g, value);
                            inputJsonString = "[" + valueString + "]";
                            console.log(inputJsonString);
                            OperatorService.statusUpdateOperator(inputJsonString)
                                    .then(function(data) {
                                        $scope.$broadcast('start', true);
                                        $scope.getOperatorList();
                                        $scope.$broadcast('stop', true);
                                    }).catch(function(err) {
                                console.log(err.message);
                            });

                        }, function() {
                        });
                    } else {
                        OperatorService.statusUpdateOperator(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getOperatorList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                }
                /** @applyGlobalSearch
                 * function used for searching cities by its city & state name
                 **/
                $scope.applyGlobalSearch = function() {
                    $scope.getOperatorList(1, $scope.globalSearchTerm, $scope.SearchCities);
                    console.log("appapapa",$scope.SearchCities);
                };

                // $scope.applyCitiesSearch = function() {
                //     $scope.getOperatorList(1, $scope.SearchCities);
                // };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getOperatorList(1);
                };

                /** @sortingforRating
                 * function used for sorting operator on the basis of rating
                 **/
                  $scope.sortingforRating = function(v) {
                    console.log("sort here",v);
                    if (v == 1) {
                        $scope.data.sort(function(a, b) {
                            return parseFloat(a.review) - parseFloat(b.review);
                        });
                    }
                    else {
                        $scope.data.sort(function(a, b) {
                            return parseFloat(b.review) - parseFloat(a.review);
                        });
                    }
                };

                $scope.operatorexportcsv = function() {
                        OperatorService.operatorexportcsv($scope.globalSearchTerm, $scope.SearchCities).then(function(data) {
                            console.log($scope.globalSearchTerm);
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/operatorfile.csv');
                                }
                                // $scope.filename="customerfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };


            }])

        .controller('RatingDemoCtrl', function($scope, $uibModalInstance) {

            $scope.rate = 5;
            $scope.max = 5;
            $scope.isReadonly = false;

            $scope.hoveringOver = function(value) {
                $scope.overStar = value;
                $scope.rate = value;
            };

            $scope.ok = function() {
                $uibModalInstance.close($scope.rate);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
