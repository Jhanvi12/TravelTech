"use strict";
angular.module("app.admin.review", [
    'app.review.services',
    'app.core.services.LocalStorage'
])
        .controller("ReviewsController", ['$scope', '$rootScope', 'ReviewService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $rootScope, ReviewService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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
                $scope.getReviewsList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return ReviewService.getReviewsList(offset, searchQuery).then(function(data) {
                                console.log('review data',  data);
                                if (data) {
                                    angular.forEach(data.data, function(value) {
                                        var driversString = "";
                                        var vehiclesString = "";
                                        angular.forEach(value.driver.driver_details, function(item, key) {
                                            var comma = (key != 0) ? ", " : " ";
                                            driversString = driversString + comma + item.name;
                                        });
                                        angular.forEach(value.vehicle.vehicle_details, function(item, key) {
                                            var comma = (key != 0) ? ", " : " ";
                                            vehiclesString = vehiclesString + comma + item.type;
                                        });
                                        value.driversString = driversString;
                                        value.vehiclesString = vehiclesString;
                                    });
                                    data = data;
                                }
                                $scope.currentPage = page ? page : 1;
                                $scope.data = data.data;
                                console.log($scope.data);
                                $scope.recordFetchedLength = data.count;
                                console.log("The review is",$scope.recordFetchedLength);
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
                /** @getCity
                 * function used for fetching city by its id
                 **/
                $scope.getReview = function() {
                    if ($stateParams.id) {
                        ReviewService.getReview($stateParams.id).then(function(data) {
                            if (data) {
                                $scope.review = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }
                /** @performAction
                 * function used for updating selected review status and delete it.
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
                        ReviewService.deleteReview(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getReviewsList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    } else {
                        ReviewService.statusUpdateReview(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getReviewsList();
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
                    $scope.getReviewsList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getReviewsList(1);
                };
            }]);