"use strict";
angular.module("app.admin.customer", [
    'app.customer.services',
    'app.core.services.LocalStorage'
])
        .controller("CustomerController", ['$scope', '$location', 'ngToast', '$rootScope', 'CustomerService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $location, ngToast, $rootScope, CustomerService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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

                /** @getCustomerList

                 * function used for fetching all customers list and set into tableParams
                 **/
                $scope.getCustomerList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return CustomerService.getCustomerList(offset, searchQuery).then(function(data) {
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
                /** @getEmployee
                 * function used for fetching customer by its id
                 **/
                $scope.getCustomer = function() {
                    if ($stateParams.id) {
                        CustomerService.getCustomer($stateParams.id).then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }
                /** @addEmployee
                 * function used for adding and updating customers
                 * @condition if user's id is found then this function update user by its id otherwise it create new customer
                 **/
                $scope.addCustomer = function(user) {
                    user.type = 'customer';
                    user.address.country = 'India';
                    if (user._id == undefined) {
                        CustomerService.addNewCustomer(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.customer');
                            $state.go('admin.customer', {}, {reload: true, location: 'replace', inherit: false, notify: true});
                            $scope.message = "Customer updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = err.message;
                        });
                    } else {
                        CustomerService.updateCustomer(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.customer');
                            $state.go('admin.customer', {}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Customer updated successfully";
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
                        CustomerService.deleteCustomer(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getCustomerList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else {
                        CustomerService.statusUpdateCustomer(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getCustomerList();
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
                    $scope.getCustomerList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getCustomerList(1);
                };


                /** @getOperator
                 * function used for fetching operator by its id
                 **/
                $scope.customerexportcsv = function() {
                        CustomerService.customerexportcsv().then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/customerfile.csv');
                                }
                                // $scope.filename="customerfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };


            }]);
