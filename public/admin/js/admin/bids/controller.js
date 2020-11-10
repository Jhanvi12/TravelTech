"use strict";
angular.module("app.admin.bid", [
    'app.bid.services',
    'app.core.services.LocalStorage'
])
        .controller("BidsController", ['$scope','$location', 'ngToast','$rootScope', 'BidService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $location, ngToast, $rootScope, BidService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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
                $scope.getBidsList = function(page, status, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }

                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            BidService.preferences().then(function(data1) {
                                $scope.bidding_time_limit = data1.bidding_time_limit;
                                $scope.bidding_acceptance_time = {};
                                $scope.bidding_acceptance_time.twodays = data1.less_than_2_days;
                                $scope.bidding_acceptance_time.threedays = data1.between_3_4_days;
                                $scope.bidding_acceptance_time.fourdays = data1.more_than_4_days;
                                return BidService.getBidsList(offset, status, searchQuery);
                            }).then(function(data) {
                                console.log('data', data);
                                if (data) {
                                    angular.forEach(data.data, function(value) {
                                        if (value.ride) {
                                            var created = value.created;
                                            var bid_approval_time = "";
                                            var bid_exp_time = "";
                                            bid_exp_time = moment(created).add($scope.bidding_time_limit, 'h').utc().format('MMMM Do YYYY, h:mm:ss a');
                                            var pickup_time = moment(value.ride.route[0].date_time).utc().format('MMMM Do YYYY, h:mm:ss a');
                                            var date_now = moment().utc().format('MMMM Do YYYY, h:mm:ss a');
                                            var days_remaining = moment(pickup_time, "DD/MM/YYYY HH:mm:ss").diff(moment(date_now, "DD/MM/YYYY HH:mm:ss"), 'days');
                                            if (days_remaining < 2) {
                                                bid_approval_time = moment(created).add($scope.bidding_acceptance_time.twodays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a');
                                            } else if (days_remaining >= 3 && days_remaining <= 4) {
                                                bid_approval_time = moment(created).add($scope.bidding_acceptance_time.threedays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a');
                                            } else {
                                                bid_approval_time = moment(created).add($scope.bidding_acceptance_time.fourdays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a');
                                            }
                                            $scope.tobecomparedate = moment().utc().format('MMMM Do YYYY, h:mm:ss a');
                                            value.bidendtime = moment.utc(bid_exp_time, 'MMMM Do YYYY, h:mm:ss a').local().format('MMMM Do YYYY, h:mm:ss a');
                                            value.bidapprovaltime = moment.utc(bid_approval_time, 'MMMM Do YYYY, h:mm:ss a').local().format('MMMM Do YYYY, h:mm:ss a');
                                        }
                                        var vehicleString = "";
                                        var bid_amount = "";
                                        angular.forEach(value.vehicle_quote, function(item, key) {
                                            console.log("vehicle type is",item.vehicle);
                                            angular.forEach(item.vehicle,function(value,key){
                                                console.log("the value is",value.id.type);
                                                  var comma = (key != 0) ? ", " : " ";
                                              vehicleString = vehicleString + comma + value.id.type;
                                            })
                                            var comma = (key != 0) ? ", " : " ";
                                            // vehicleString = vehicleString + comma + item.vehicle.type;
                                            bid_amount = bid_amount + item.bid_amount;
                                        });
                                        value.vehicleString = vehicleString;
                                        value.bid_amount = bid_amount;
                                    });
                                    $scope.data = data;
                                }
                                var bidArray = [];
                                $scope.bidArray = data.data;
                                $scope.currentPage = page ? page : 1;
                                $scope.data = data.data;
                                console.log("The bid is",$scope.data);
                                $scope.recordFetchedLength = data.count;
                                console.log( $scope.recordFetchedLength);
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
                        BidService.deleteBid(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getBidsList();
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
                    $scope.getBidsList(1, "", $scope.globalSearchTerm);
                };

                /*Passing the value for sorting of data */
                $scope.goValue = function(value) {
                    $scope.value = value;
                    $scope.getCanceledRidesList(1, $scope.value, "");
                };

                /*Sorting according to prices*/
                $scope.sortingforPrice = function(v) {
                    console.log(v);
                    if (v == 1) {
                        $scope.bidArray.sort(function(a, b) {
                            return parseFloat(a.bid_amount) - parseFloat(b.bid_amount);
                        });
                    }
                    else {
                        $scope.bidArray.sort(function(a, b) {
                            return parseFloat(b.bid_amount) - parseFloat(a.bid_amount);
                        });
                    }
                };

                /*Sorting according to status*/
                $scope.sortingforStatus = function(value) {
                    $scope.getBidsList(1, value, "");
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getBidsList(1);
                };

                $scope.calcTotalAmount = function(qoute) {
                    if (!qoute) {
                        qoute = [];
                    }
                    var totalAmount = 0;
                    qoute.forEach(function(val) {
                        totalAmount = totalAmount + val.bid_amount;
                    });
                    return totalAmount;
                };

                $scope.bidsexportcsv = function() {
                        BidService.bidsexportcsv().then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/bidsfile.csv');
                                }
                                // $scope.filename="bidsfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };

            }]);
