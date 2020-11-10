"use strict";
angular.module("app.admin.openleads", [
    'app.openleads.services',
    'app.core.services.LocalStorage'
])
        .controller("OpenLeadsController", ['$scope', '$location', 'ngToast', '$rootScope', 'OpenLeadService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $location, ngToast, $rootScope, OpenLeadService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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

                 * function used for fetching all open leads list and set into tableParams
                 **/
                $scope.getOpenLeadsList = function(page, type, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return OpenLeadService.getOpenLeadsList(offset, type, searchQuery).then(function(data) {
                                OpenLeadService.preferences().then(function(data2) {
                                    $scope.bidding_time_limit = data2.bidding_time_limit;
                                    angular.forEach(data.data, function(item) {
                                        var created = item.created;
                                        item.bid_exp_time = moment(created).add($scope.bidding_time_limit, 'h').utc().format('MMMM Do YYYY, h:mm:ss a');
                                        item.bidendtime = item.bid_exp_time;
                                    });
                                });
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
                $scope.getOpenLead = function() {
                    if ($stateParams.id) {
                        OpenLeadService.getOpenLead($stateParams.id).then(function(data) {
                            if (data) {
                                OpenLeadService.preferences().then(function(data2) {
                                    $scope.bidding_time_limit = data2.bidding_time_limit;
                                    var created = data.created;
                                    var bid_exp_time = moment(created).add($scope.bidding_time_limit, 'h').utc().format('MMMM Do YYYY, h:mm:ss a');
                                    data.bidendtime = bid_exp_time;
                                    OpenLeadService.fetchBidsForRide(data._id).then(function(data1) {
                                        var bids = [];
                                        bids = data1;
                                        data.bids = data1;
                                    }).catch(function(err) {
                                        console.log('Error');
                                    });

                                });
                                $scope.lead = data;
                                console.log(data.bids);
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
                        console.log(user);
                        CustomerService.addNewCustomer(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.customer');
                            $state.go('admin.customer', {}, {reload: true, location: 'replace', inherit: false, notify: true});
                            $scope.message = "Customer updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = "Customer could not saved.";
                        });
                    } else {
                        CustomerService.updateCustomer(user).then(function(data) {
                            $scope.$broadcast('start', true);
                            $state.reload('admin.customer');
                            $state.go('admin.customer', {}, {reload: true, inherit: false, notify: true});
                            $scope.message = "Customer updated successfully";
                            $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            $scope.message = "Customer could not updated.";
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
                         console.log(inputJsonString);
                        OpenLeadService.deleteOpenLead(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                   $scope.getOpenLeadsList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else {
                        CustomerService.statusUpdateOpenLead(inputJsonString)
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
                    $scope.getOpenLeadsList(1, "", $scope.globalSearchTerm);
                };

                /*Passing the value for sorting of data */
                $scope.goValue = function(value) {
                    $scope.value = value;
                    $scope.getOpenLeadsList(1,$scope.value,"");
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getOpenLeadsList(1);
                };

                $scope.getBidsList = function() {
                    if ($stateParams.id) {
                        OpenLeadService.fetchBidsForRide($stateParams.id).then(function(data) {
                            if (data) {
                                angular.forEach(data, function(value) {
                                    var vehicleString = "";
                                    var bid_amount = "";
                                    angular.forEach(value.vehicle_quote, function(item, key) {
                                        var comma = (key != 0) ? ", " : " ";
                                        vehicleString = vehicleString + comma + item.vehicle.type;
                                        bid_amount = item.bid_amount;
                                    });
                                    value.vehicleString = vehicleString;
                                    value.bid_amount = bid_amount;
                                });
                                $scope.bids = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }

                $scope.openleadsexportcsv = function() {
                        OpenLeadService.openleadsexportcsv().then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/opeanleadsfile.csv');
                                }
                                // $scope.filename="opeanleadsfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };

            }]);
