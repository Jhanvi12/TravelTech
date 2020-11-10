"use strict";
angular.module("app.admin.emailtemplate", [
    'app.emailtemplate.services',
    'app.core.services.LocalStorage'
])
        .controller("EmailTemplateController", ['$scope', '$location', '$rootScope', 'EmailTemplateService', 'LocalStorageService', 'NgTableParams', '$stateParams', '$state', '$http',
            function($scope, $location, $rootScope, EmailTemplateService, LocalStorageService, NgTableParams, $stateParams, $state, $http) {
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

        $scope.emailTemplate = [];
        $scope.menu = "emailTemplate";
        $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };
        $scope.getAllEmailTemplate = function (page,searchQuery) {
            $scope.selectedClient = [];
              $scope.tableParams = new NgTableParams({}, {counts: [], getData: function($defer, params) {
                      return EmailTemplateService.getAllEmailTemplates(searchQuery).then(function(data) {
                          $scope.currentPage = page ? page : 1;
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
                          return $scope.data;
                      });
                  }});


        };
        $scope.add = function(data){
                EmailTemplateService.saveEmailTemplate(data).then(function(data) {
                    $state.go('admin.emailtemplate');
                    $scope.message = "Driver added successfully";
                }).catch(function(err) {
                    $scope.message = err.message;
                });
        };

        $scope.update = function(data){
                EmailTemplateService.updateEmailTemplate(data);
                $state.go('admin.emailtemplate');
        };

        var id = $state.params.id;
        EmailTemplateService.getEmailTemplateById(id).then(function(data) {
               $scope.client = data;
               console.log("data",data);
        }).catch(function(err) {
            $scope.message = err.message;
        });

        $scope.delete = function(id){

            var r = confirm("Are you sure you want to delete Selected template?");
            if (r == true) {
            // if(id != null){
            //     alert("Are you sure you want delete");
                EmailTemplateService.deleteEmailTemplate(id);
            // }
            // EmailTemplateService.deleteEmailTemplate(id);

                    //state.go('admin.emailtemplate');
                    $scope.getAllEmailTemplate();
                    $scope.message = "Driver added successfully";

                } else{}
        };
        $scope.applyGlobalSearch = function() {
            console.log($scope.globalSearchTerm);
            $scope.getAllEmailTemplate(1,$scope.globalSearchTerm);
        };
        $scope.refreshData = function() {
            $scope.getAllEmailTemplate(1);
        };

        // $scope.deleteSelect = function(id){
        //    var idx1 = $scope.selectedClient.indexOf(id);
        //    if (idx1 > -1) {
        //        $scope.allChecked = false;
        //        $scope.selectedClient.splice(idx1, 1);
        //    } else {
        //        $scope.selectedClient.push(id);
        //    }
        //    console.log($scope.selectedClient);
        //
        // }
        //
        //
        //    $scope.deleteAll = function() {
        //
        //     var r = confirm("Are you sure you want to delete Selected user?");
        //     if (r == true) {
        //         emailTemplate.deleteEmailTemplate().save({
        //             id: $scope.selectedClient
        //         }, function(data) {
        //             // $route.reload();
        //             $scope.showEdit = false;
        //             $scope.showAdd = false;
        //             $scope.showList = true;
        //             $scope.showViewInfo = false;
        //             $scope.SelectAllCheck = false;
        //             $scope.check = [];
        //             $scope.selectedClient = [];
        //             if($scope.allChecked == true){
        //                if($scope.page == 1){
        //                $scope.getAllEmailTemplate($scope.page,$scope.count);
        //                }else{
        //                $scope.getAllEmailTemplate($scope.page - 1,$scope.count);
        //                }
        //                $scope.allChecked == false;
        //             }else{
        //                $scope.getAllEmailTemplate($scope.page,$scope.count);
        //             }
        //         })
        //     } else {}
        //
        // }
        //
        //
        // $scope.selectAll = function(val,params) {
        //       if(val){
        //        for(var i = 0 ; i < params.data.length ; i++){
        //            $scope.check[params.data[i]._id] = true;
        //        }
        //        $scope.allChecked = true;
        //        $scope.selectedClient = [];
        //         params.data.forEach(function(value){
        //            $scope.selectedClient.push(value._id)
        //         })
        //       }else{
        //            $scope.allChecked = false;
        //            $scope.selectedClient = [];
        //            $scope.check = [];
        //       }
        // }
        //
        // $scope.editForm = function(id){

            // emailTemplate.getEmailTemplateById().get({id : id},function(data){
            //     console.log('astha');
            //     $scope.client = data.data;
            // })
        // }
        // $scope.addForm = function(id){
        //     $scope.showList = false;
        //     $scope.showEdit = false;
        //     $scope.showAdd =true;
        // }
        //
        //
        //

        //
        // $scope.edit = function(data){
        //     console.log('data',data);
            // var d = {
            //     'title' : data.title,
            //     'subject' : data.subject,
            //     'description' : data.description,
            //     'code' : data.code
            // }
        //     emailTemplate.saveEmailTemplate().save(data,function(data){
        //         // $route.reload();
        //         $scope.showEdit = false;
        //         $scope.showAdd = false;
        //         $scope.showList = true;
        //         $scope.getAllEmailTemplate($scope.page,$scope.count);
        //         // $scope.client = data.client;
        //         // console.log($scope.client);
        //     })
        // }
        // $scope.back = function(){
        //     $scope.showEdit = false;
        //     $scope.showAdd = false;
        //     $scope.showList = true;
        //     $scope.getAllEmailTemplate($scope.page,$scope.count);
        // }

            }]);
