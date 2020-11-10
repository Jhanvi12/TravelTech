"use strict";
angular.module("app.admin.document", [
    'app.document.services',
    'app.core.services.LocalStorage'
])
        .controller("DocumentController", ['$scope', '$rootScope', 'DocumentService', 'LocalStorageService', 'NgTableParams', '$uibModal', '$stateParams', '$state', '$http',
            function($scope, $rootScope, DocumentService, LocalStorageService, NgTableParams, $uibModal, $stateParams, $state, $http) {
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
                $scope.getDocumentList = function(page, searchQuery) {
                    var offset;
                    if (!page) {
                        offset = 0;
                    } else {
                        offset = ((page - 1) * 10);
                    }
                    $scope.driverID = oprid;
                    $scope.tableParams = new NgTableParams({}, {counts: [], getData: function() {
                            return DocumentService.getDocumentList(offset, searchQuery, $stateParams.id, $stateParams.type).then(function(data) {
                                $scope.currentPage = page ? page : 1;
                                if (data) {
                                    angular.forEach(data, function(value) {
                                        if (value.driver != null) {
                                            var type = "Driver";
                                        } else {
                                            type = "Vehicle";
                                        }
                                        value.document_type = type;
                                    });
                                    data = data;
                                }
                                $scope.data = data;
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

                /** @performAction
                 * function used for updating selected user's status and delete him.
                 **/
                $scope.performAction = function() {
                    var data = $scope.checkboxes.items;
                    var records = [];
                    var inputJsonString = "";
                    var jsonString = "";
                    var actionToPerform = "";
                    var decline_comment = "";
                    $scope.selectAction = selectAction.value;
                    if ($scope.selectAction == "decline") {
                        actionToPerform = "decline";
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
                                    jsonString = '{"_id": "' + id + '", "status":"approved"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "status":"approved"}';
                                }
                            } else if (actionToPerform == "decline") {

                                if (jsonString == "") {
                                    jsonString = '{"_id": "' + id + '", "status":"decline","decline_comment":"declined"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "status":"decline", "decline_comment":"declined"}';
                                }


                            }
                            else {
                                if (jsonString == "") {
                                    jsonString = '{"_id": "' + id + '", "status":"pending"}';
                                }
                                else {
                                    jsonString = jsonString + "," + '{"_id": "' + id + '", "status":"pending"}';
                                }
                            }
                        }
                    }

                    inputJsonString = "[" + jsonString + "]";
                    if (actionToPerform == "delete") {
                        DocumentService.deleteDocument(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getDocumentList();
                                    $scope.$broadcast('stop', true);
                                }).catch(function(err) {
                            console.log(err.message);
                        });
                    }
                    else if (actionToPerform == 'decline') {
                        var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'js/admin/document/views/decline.html',
                            controller: 'ModalInstanceCtrl',
                        });
                        modalInstance.result.then(function(decline_comment) {
                            var declineString = jsonString.replace(/declined/g, decline_comment);
                            inputJsonString = "[" + declineString + "]";
                            DocumentService.statusUpdateDocument(inputJsonString)
                                    .then(function(data) {
                                        $scope.$broadcast('start', true);
                                        $scope.getDocumentList();
                                        $scope.$broadcast('stop', true);
                                    }).catch(function(err) {
                                console.log(err.message);
                            });

                        }, function() {
                        });
                    } else {
                        console.log(inputJsonString, '***');
                        DocumentService.statusUpdateDocument(inputJsonString)
                                .then(function(data) {
                                    $scope.$broadcast('start', true);
                                    $scope.getDocumentList();
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
                    $scope.getDocumentList(1, $scope.globalSearchTerm);
                };

                /** @refreshData
                 * function used for refresh driver list and reset search
                 **/
                $scope.refreshData = function() {
                    $scope.getDocumentList(1);
                };

                $scope.open = function(images) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'js/admin/document/views/view_image_modal.html',
                        controller: 'VeiwImageController',
                        resolve: {
                            images: function() {
                                return images;
                            }
                        }
                    });
                    modalInstance.result.then(function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.openImageModal = function(images) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'js/operator/myprofile/views/show_array_images.html',
                        controller: 'VeiwArrayImageController',
                        resolve: {
                            images: function() {
                                return images;
                            }
                        }
                    });
                    modalInstance.result.then(function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

            }])

        .controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {


            $scope.ok = function() {
                $uibModalInstance.close($scope.decline_comment);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })

        .controller('VeiwImageController', function($scope, $uibModalInstance, images) {
            $scope.images = images;
            $scope.selected = {
                item: $scope.images[0],
                index: 0
            };

            $scope.next = function() {
                var index = $scope.selected.index + 1;
                if (index >= $scope.images.length) {
                    $scope.selected.index = 0;
                } else {
                    $scope.selected.index = index;
                }
            };

            $scope.prev = function() {
                var index = $scope.selected.index - 1;
                if (index < 0) {
                    $scope.selected.index = $scope.images.length - 1;
                } else {
                    $scope.selected.index = index;
                }
            };
        });