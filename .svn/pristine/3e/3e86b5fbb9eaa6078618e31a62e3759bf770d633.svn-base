angular.module('app.admin.dashboard', [
    'app.core.services.LocalStorage',
    'app.core.service.Count',
    'app.factory.socket'
])
        .controller('AdminDashboardController', ['$scope', 'socket', 'LocalStorageService', 'Count', '$state', '$http',
            function($scope, socket, LocalStorageService, Count, $state, $http) {

                socket.on('news', function (data) {
    			    socket.emit('my other event', { my: 'data' });
    		    });
                if (!LocalStorageService.isLogin('travel_tech_admin')) {
                    $state.go('admin.login');
                } else {
                    $scope.admin = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.admin.token;
                    $scope.loggedInUser = $scope.admin.profile.name;
                    if ($scope.admin.profile.picture) {
                        $scope.profile_pic = $scope.admin.profile.profile_pic;
                    } else {
                        $scope.profile_pic = "/img/profile_pic.png";
                    }
                }

                $scope.getCustomersCount = function() {
                    Count.getUsersCount("customer").then(function(data) {
                        $scope.customersCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getOperatorsCount = function() {
                    Count.getUsersCount("operator").then(function(data) {
                        $scope.operatorsCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getRequestsCount = function() {
                    Count.getRequestsCount().then(function(data) {
                        if (data.count != undefined) {
                            $scope.requestsCount = data.count;
                        } else {
                            $scope.requestsCount = 0;
                        }

                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getOpenLeadsList = function() {
                    Count.getRequestsCount().then(function(data) {
                        $scope.openlead = data.data;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getDriversCount = function() {
                    Count.getDriversCount().then(function(data) {
                        $scope.data = data;
                        $scope.driversCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getVehiclesCount = function() {
                    Count.getVehiclesCount().then(function(data) {
                        $scope.data = data;
                        $scope.vehiclesCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getEmployeesCount = function() {
                    Count.getEmployeesCount().then(function(data) {
                        $scope.data = data;
                        $scope.employeesCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getUsersList = function() {
                    Count.getUsersCount("customer").then(function(data) {
                        $scope.customer = data.data;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getCitiesCount = function() {
                    Count.getCitiesCount().then(function(data) {
                        $scope.data = data;
                        $scope.citiesCount = data.count;
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getUpcomingRidesCount = function() {
                    Count.getRidesCount("upcoming").then(function(data) {
                        if (data.count != undefined) {
                            $scope.upcomingRidesCount = data.count;
                        } else {
                            $scope.upcomingRidesCount = 0;
                        }
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getCompletedRidesCount = function() {
                    Count.getRidesCount("completed").then(function(data) {
                        if (data.count != undefined) {
                            $scope.completedRidesCount = data.count;
                        } else {
                            $scope.completedRidesCount = 0;
                        }
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getCanceledRidesCount = function() {
                    Count.getRidesCount("canceled").then(function(data) {
                        if (data.count != undefined) {
                            $scope.canceledRidesCount = data.count;
                        } else {
                            $scope.canceledRidesCount = 0;
                        }
                    }).catch(function(err) {
                        console.log(err)
                    });
                };

                $scope.getModulesList = function() {
                    $scope.admin = JSON.parse(LocalStorageService.get('travel_tech_admin'));
                    Count.getModulesList($scope.admin.profile.uid).then(function(data) {
                        data.forEach(function(item) {
                            if (item.module == 1) {
                                $scope.customer = item.is_active;
                            } else if (item.module == 2) {
                                $scope.operator = item.is_active;
                            } else if (item.module == 3) {
                                $scope.driver = item.is_active;
                            } else if (item.module == 4) {
                                $scope.vehicle = item.is_active;
                            } else if (item.module == 5) {
                                $scope.city = item.is_active;
                            } else if (item.module == 6) {
                                $scope.category = item.is_active;
                            } else if (item.module == 7) {
                                $scope.preference = item.is_active;
                            } else if (item.module == 8) {
                                $scope.open = item.is_active;
                            } else if (item.module == 9) {
                                $scope.upcoming = item.is_active;
                            } else if (item.module == 10) {
                                $scope.completed = item.is_active;
                            } else if (item.module == 11) {
                                $scope.canceled = item.is_active;
                            }
                        });
                    }).catch(function(err) {
                        console.log(err)
                    });
                };
            }]);
