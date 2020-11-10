"use strict";
angular.module("app.admin.corporate", [
    'app.corporate.services',
    'app.core.services.LocalStorage'
])
        .controller("CorporateController", ['$scope', '$location', 'ngToast', '$rootScope', 'CorporateService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $location, ngToast, $rootScope, CorporateService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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
                $scope.getCorporateList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return CorporateService.getCorporateList(offset, searchQuery).then(function(data) {
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
                $scope.getCorporate = function() {
                    console.log('getCorporate func called stateParams.id',$stateParams.id);
                    if ($stateParams.id) {
                        CorporateService.getCorporate($stateParams.id).then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });
                    }
                }
               

            
                /** @applyGlobalSearch
                 * function used for searching cities by its city & state name
                 **/
                $scope.applyGlobalSearch = function() {
                    $scope.getCorporateList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh city list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getCorporateList(1);
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
                        CorporateService.deleteCorporate(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getCorporateList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else {
                        CorporateService.statusUpdateCorporate(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getCorporateList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                }

                      $scope.corporateexportcsv = function() {
                        CorporateService.corporateexportcsv().then(function(data) {
                            console.log(data);
                            if (data) {
                                $scope.user = data;
                                if(window.open() == null){
                                    ngToast.create('please allow popups to download the file.')
                                    //alert("please allow popups to download the file");
                                }else {
                                    window.open($location.protocol()+'://'+$location.host()+':'+$location.port()+'/public/uploads/corporatefile.csv');
                                }
                                // $scope.filename="customerfile.csv";
                            }
                        }).catch(function(err) {
                            console.log('Error');
                        });

                };


                /*
                To delete the corporate by using their id
                Date : 08 June 2016*/
                $scope.deleteCorporateSingle = function(id){
                    console.log('the id to be delete',id);
                       CorporateService.deleteCorporateSingle(id).then(function(data) {
                            console.log(data);
                                    $scope.$broadcast('start', true);
                                    $scope.getCorporateList();
                                    $scope.$broadcast('stop', true);
                        }).catch(function(err) {
                            console.log('Error');
                        });
                };

                /*Update Corporate*/
               $scope.updateCorporate = function(user){
                   console.log('the user id',user,$stateParams.id);
                   CorporateService.updateCorporateSingle(user,$stateParams.id).then(function(data) {
                            console.log(data);
                                    $scope.$broadcast('start', true);
                                    $scope.getCorporateList();
                                    $scope.$broadcast('stop', true);
                                    $state.go('admin.corporate');
                        }).catch(function(err) {
                            console.log('Error');
                        });

               };
               /*To add a corporate from index page through admin*/
                     $scope.addCorporate = function(user){
                           $scope.user.type="corporate";
                            console.log('addCorporate called',user);
                             CorporateService.addCorporateSingle(user).then(function(data) {
                                    console.log(data);
                                    $scope.$broadcast('start', true);
                                    $scope.getCorporateList();
                                    $scope.$broadcast('stop', true);
                                    $state.go('admin.corporate');
                        }).catch(function(err) {
                            console.log('Error');
                        });
  };

            }]);
