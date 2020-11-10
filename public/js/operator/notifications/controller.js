angular.module('app.operator.notifications', [
        'app.core.services.LocalStorage',
        'app.operator.notifications.service',

    ])
    .controller('NotificationController', ['$scope','$rootScope' ,'$state', '$stateParams', '$timeout', 'LocalStorageService', 'NotificationoperatorService', 'ngToast', "NgTableParams", '$filter',
        'sweet',function($scope,$rootScope, $state, $stateParams, $timeout, LocalStorageService, NotificationoperatorService, ngToast, ngTableParams, $filter,sweet) {


            $scope.LoggedInUser = JSON.parse(LocalStorageService.get('travel_tech_user')).profile;
            console.log($scope.LoggedInUser)

            // used to get notifications list
            $scope.getNotifications = function() {
               NotificationoperatorService.getNotifications($scope.LoggedInUser.uid).then(function(data) {
                    $scope.notifications = data;
                    $scope.recordfetchlength = data.length;
                    $rootScope.notcount = data.length;
                    $rootScope.notdesc = data;
                    console.log('$scope.recordfetchlength',$scope.recordfetchlength);
                    $scope.tableParams = new ngTableParams({
                        page: 1,
                        count: 10,
                        filter: {},
                        sorting: {
                            'guest_name': 'asc',
                            'guest_email': 'asc',
                        }
                    }, {
                        total: $scope.notifications.length,
                        getData: function($defer, params) {
                            var filteredData = params.filter() ?
                                $filter('filter')($scope.notifications, params.filter()) :
                                $scope.notifications;
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                filteredData;
                            params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });
                }).catch(function(err) {
                    console.log(err)
                });
            };
            /*Delete the notification before asking*/
            $scope.confirmCancel = function(id) {
            sweet.show({
            title: 'Confirm',
            text: 'Delete this Notification?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.deletenotification(id); 
                sweet.show('Deleted!', 'The notification has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your notification is safe :)', 'error');
            }
        });
    };

            // used to delete notification
            $scope.deletenotification = function(id) {
                console.log("The id is", id);
                var jsonString = "";
                jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';
                inputJsonString = "[" + jsonString + "]";
                console.log(" inputJsonString", inputJsonString);
                NotificationoperatorService.deleteNotification(inputJsonString).then(function(data) {
                    console.log("success");
                   $scope.getNotifications();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }

            // used to read notifications
            $scope.readnotification = function(id) {
                console.log("The id is", id);
                var jsonString = "";
                jsonString = '{"_id": "' + id + '", "is_read":"true"}';
                inputJsonString = "[" + jsonString + "]";
                console.log(" inputJsonString", inputJsonString);
                NotificationoperatorService.statusUpdateNotification(inputJsonString).then(function(data) {
                    console.log("success");
                    $scope.getNotifications();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
             /*Sorting according to status*/
                $scope.sortingforStatus = function(value) {
                    console.log('The value for sorting is',value);
                    NotificationoperatorService.sortingforStatus($scope.LoggedInUser.uid,value).then(function(data) {
                    console.log("success n",data);
                      $scope.notifications = data;
                      $scope.recordfetchlength = data.length;
                     $scope.tableParams = new ngTableParams({
                        page: 1,
                        count: 10,
                        filter: {},
                        sorting: {
                            'guest_name': 'asc',
                            'guest_email': 'asc',
                        }
                    }, {
                        total: $scope.notifications.length,
                        getData: function($defer, params) {
                            var filteredData = params.filter() ?
                                $filter('filter')($scope.notifications, params.filter()) :
                                $scope.notifications;
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                filteredData;
                            params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });
                  

               
                }).catch(function(err) {
                    console.log(err.message);
                });
              
                };
        }
    ]);
