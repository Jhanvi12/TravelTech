"use strict";
angular.module("app.admin.notification", [
    'app.notification.services',
    'app.core.services.LocalStorage',
    'app.core.service.Count'
])
        .controller("NotificationsController", ['$scope', '$rootScope', 'NotificationService', 'LocalStorageService', 'NgTableParams', '$stateParams', 'Count', '$state', '$http','ngToast',
            function($scope, $rootScope, NotificationService, LocalStorageService, NgTableParams, $stateParams, Count, $state, $http,ngToast) {
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
                $scope.getNotificationsList = function(page, status, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {                            
                            return NotificationService.getNotificationsList(offset, status, searchQuery).then(function(data) {
                                $scope.currentPage = page ? page : 1;
                                $scope.data = data.data;
                                $scope.recordFetchedLength = data.count;
                                console.log( "The data lenght is",$scope.recordFetchedLength);
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
                $scope.getNotification = function(id) {
                    console.log("inside get notification");
                    // console.log("$stateParams.id",$stateParams.id);
                    // if ($stateParams.id) {
                        NotificationService.getNotification(id).then(function(data) {
                            if (data) {
                                $scope.review = data;
                            }
                            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });   
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    //}
                }
                /** @addCity
                 * function used for adding and updating city
                 * @condition if city id is found then this function update city by its id otherwise it will add new city
                 **/
                $scope.addNotification = function(notify) {
                    NotificationService.addNewNotification(notify).then(function(data) {
                        // ngToast.dismiss();
                        //  ngToast.create({
                        //   className: 'success',
                        //  content: 'Successfully Added'
                        //   });
                        $scope.$broadcast('start', true);
                        $state.reload('admin.notification');
                        $state.go('admin.notification', {}, {reload: true, location: 'replace', inherit: false, notify: true});
                        $scope.message = "Notification saved successfully";
                        console.log($scope.message);
                        $scope.$broadcast('stop', true);
                    }).catch(function(err) {
                        $scope.message = err.message;
                       //  ngToast.dismiss();
                       //  ngToast.create({
                       //  className: 'danger',
                       //  content: 'Information not saved'
                       // });
                    });

                };

                /** @performAction
                 * function used for updating selected city status and delete it.
                 **/
                $scope.performAction = function() {
                    var data = $scope.checkboxes.items;
                    var records = [];
                    var inputJsonString = "";
                    var jsonString = "";
                    var actionToPerform = "";
                    $scope.selectAction = selectAction.value;
                    if ($scope.selectAction == "read") {
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
                                    jsonString = '{"_id": "' + id + '", "is_read":"' + actionToPerform + '"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "is_read":"' + actionToPerform + '"}';
                                }
                            }
                        }
                    }
                    inputJsonString = "[" + jsonString + "]";
                    if (actionToPerform == "delete") {
                        NotificationService.deleteNotification(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getNotificationsList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    } else {
                        NotificationService.statusUpdateNotification(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getNotificationsList();
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
                    $scope.getNotificationsList(1, null, $scope.globalSearchTerm);
                    console.log("The global search term is",$scope.globalSearchTerm);
                };

                /*Sorting according to status*/
                $scope.sortingforStatus = function(value) {
                    $scope.getNotificationsList(1, value, "");
                };

                /*users list*/
                $scope.userslist = function(value) {
                    $scope.showUsersInDropDown(value);
                };

                /*users list*/
                $scope.showUsersInDropDown = function(value) {
                    Count.getUsersCount(value).then(function(data) {
                        $scope.options = data.data;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getNotificationsList(1);
                };
            }]);