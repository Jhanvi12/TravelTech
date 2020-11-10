angular.module('app.operator.signup',
['app.core.service.signup',
'app.operator.signup.service',
'app.core.services.LocalStorage',
'app.operator.myprofile.service',
'vsGoogleAutocomplete'
])

.controller('OperatorSignupController',['$scope','$http','$state','SignupService','SignupLocalService','MyProfileService','ngToast','$stateParams','ngTableParams','$filter','LoginService','LocalStorageService',
function($scope,$http,$state,SignupService,SignupLocalService,MyProfileService,ngToast,$stateParams,ngTableParams,$filter,LoginService,LocalStorageService){

       $scope.state.name = $state.current.name;
       /*
       @Function:to submit data at first step
       parameters:
       */
        $scope.gotopage=function(user){
        user.type="operator";
           SignupService.signup(user).then(function(data){
            sessionStorage.setItem("travel_tech_user_SignupCredentials", JSON.stringify($scope.user));
                    data.type="operator";
                    $state.go('verification',{type: data.type,uid:data._id});
                    ngToast.dismiss();
                    ngToast.create({
                        className: 'success',
                        content: 'Registered Successfully'
                    });
                }).catch(function(err){
                    ngToast.dismiss();
                    ngToast.create({
                        className: 'danger',
                        content: "Process Failed"
                    });
                });

      };
       /*
       @Function:to fetch data for second step
       parameters:
       */

       $scope.getDataById = function(){
       SignupLocalService.getDataById($stateParams.uid).then(function(data){
            console.log(data);
            $scope.fetchdata = data;
            $scope.fetchdata.cities =[];
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
        SignupLocalService.getStateList().then(function(data){
            console.log(data);
            $scope.stateList = data.data;
 
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
    };

       /*
       @Function:to save data for second step
       parameters:
       */
  
    $scope.gotostep = function(user){
     user.address = [];
     var addrObj = {};

       addrObj.street = user.cities.street;
       addrObj.city = user.cities.city;
       addrObj.state = user.cities.state;
       addrObj.country = user.cities.country;
       addrObj.zip = user.cities.zip;
       console.log(user.cities, addrObj);
       user.address.push(addrObj);
        angular.forEach(user.city,function(item){
            var add = {};
            add.street = item.street;
            add.city = item.city;
            add.state = item.state;
            add.country = item.country;
            add.zip = item.zip;
            user.address.push(add);
        });
      user.type = "operator";
       SignupService.signuptotal(user,$stateParams.uid).then(function(data){
       $state.go('operator.signupstep3', {uid:data._id});
                   ngToast.dismiss();
                    ngToast.create({
                        className: 'success',
                        content: 'Registered Successfully'
                    });
                }).catch(function(err){
                    ngToast.dismiss();
                    ngToast.create({
                        className: 'danger',
                        content: "Process Failed"
                    });
                });

    };

/*Getting Cities*/
$scope.getCityList=function(){
 SignupLocalService.getCityList().then(function(data){
            $scope.cities = data.data;
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
}();

 $scope.driver = {};
    /**
    * @addDriverInfo
    * function user for adding new driver's information
    **/
    $scope.addDriverInfo = function(){
        $scope.driver.profile_pic =  $scope.myFile.file;
        $scope.driver.dl =  $scope.myFile.dl;
        $scope.driver.verification =  $scope.myFile.verification;
        $scope.driver.is_active = true;
        MyProfileService.saveDriver($scope.driver,$stateParams.uid).then(function(data){

                $state.go('operator.signupfinish');

          //  $scope.getDriverInfo(1);
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Successfully Added"
            });
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
    };
    /**
    * @getDriverInfo
    * function user for fetching driver's information
    **/
    $scope.getDriverById = function(){
        MyProfileService.getDriverById($stateParams.uid).then(function(data){

            MyProfileService.getDocuments("driver", data._id).then(function(docdata){
                if(docdata){
                    data.dl = [];
                    data.verification = [];
                    angular.forEach(docdata, function(val, index){
                        if(val.type == 'dl'){
                            data.dl.push(val);
                        }else if(val.type == 'driver_verification'){
                            data.verification.push(val);
                        }else{
                        }
                    });
                }
            });
            $scope.driver_data = data;
        }).catch(function(err){
            console.log(err)
        });
    };

     /*Show the value in dropdown box
    */
    $scope.showVehiclesInDropDown=function(){
        MyProfileService.showVehiclesCategory().then(function(data){
            if(data){
                $scope.options = data;
            }
        }).catch(function(err){
            console.log(err);
        });
    };
     /*Setting cars and corresponding capacity*/
     var typeobj={};
     var json_typeobj={};
    $scope.setCarandCategory=function(typeobj){
         json_typeobj = JSON.parse(typeobj);
         $scope.typeobj={'type':json_typeobj.type, 'capacity':json_typeobj.capacity};
         console.log('typeobj is',$scope.typeobj); 
 };


     /*
    date:15feb
    function name:submitVehicleInfo
    function:to save vehicle information in the database.
    param:data|files
    */
    $scope.vehicle_info = {};
    $scope.vehicle_info.features = ['false', 'false', 'music_system'];
    $scope.myFile = {};
    $scope.submitVehicleInfo=function(form){
        console.log('yes we are getting stateparams.id',$stateParams.uid)
        $scope.vehicle_info.images = $scope.myFile.file;
        $scope.vehicle_info.rc = $scope.myFile.rc;
        $scope.vehicle_info.permit = $scope.myFile.permit;
        $scope.vehicle_info.type=$scope.typeobj.type;
        $scope.vehicle_info.capacity=$scope.typeobj.capacity;
        MyProfileService.saveVehicleInfo($scope.vehicle_info,$stateParams.uid).then(function(data){
            form.$setPristine();
            form.$setUntouched();
               $state.go('operator.signupstep4', {uid:$stateParams.uid});
              //  $scope.showVehicles(1);
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Information saved'
                });
                $scope.vehicle_info = {};
                $scope.myFile = {};
                $scope.category_data = {};
        }).catch(function (err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });

    };
    $scope.editVehicles=function(){
     MyProfileService.getDataOfVehicleById($stateParams.id).then(function(data){
         console.log('the edit data is',data);
         if(data){

                 MyProfileService.getDocuments("vehicle", data._id).then(function(docdata){
                     if(docdata){
                         data.rc = [];
                         data.permit = [];
                         angular.forEach(docdata, function(val, index){
                             if(val.type == 'rc'){
                                 data.rc.push(val);
                             }else if(val.type == 'permit'){
                                 data.permit.push(val);
                             }else{
                             }
                         });
                     }
                 });

             $scope.vehicle_info=data;
             $scope.vehicleCategoryId = data.category._id;
             $scope.setCar($scope.vehicleCategoryId,data.type);
 }
     }).catch(function(err){
         ngToast.dismiss();
         ngToast.create({
             className: 'danger',
             content: 'Information not saved'
         });
     });
 };


 $scope.open = function (images) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/operator/myprofile/views/view_image_modal.html',
            controller: 'VeiwImageController',
            resolve: {
                images: function () {
                    return images;
                }
            }
        });
        modalInstance.result.then(function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openImageModal = function (images) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/operator/myprofile/views/show_array_images.html',
            controller: 'VeiwArrayImageController',
            resolve: {
                images: function () {
                    return images;
                }
            }
        });
        modalInstance.result.then(function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

//login After Signup
    $scope.login = function(){
        console.log("inside login");

        $scope.user=JSON.parse(sessionStorage.getItem("travel_tech_user_SignupCredentials"));
        console.log($scope.user);

        var data = {};
        data.username=$scope.user.email;
        data.password=$scope.user.password;
        data.type=$scope.user.type;
            LoginService.userLogin(data).then(function(res){
            console.log('the res is',JSON.stringify(res));
            LocalStorageService.set("travel_tech_user", JSON.stringify(res));
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(LocalStorageService.get('travel_tech_user')).token;
            $scope.show.is_approved = false;
            $state.go("operator.myprofile");
      
             }).catch(function(err){
               $state.go("operator.login");
                });

    };
    /*second dd*/
   /*Show the value in dropdown box
    */
    $scope.setCar=function(category_id){
        console.log('The category id is',category_id);
        MyProfileService.showDefaultVehiclesInDropdown(category_id).then(function(data){
            if(data){
                console.log('the data according to category is',data);
                $scope.category_data= data;
            }
        }).catch(function(err){
            console.log(err);
        });
    };

}])
.controller('VeiwImageController', function ($scope, $uibModalInstance, images) {
    console.log(images)
    $scope.images = images;
    $scope.selected = {
        item: $scope.images[0],
        index: 0
    };

    $scope.next = function () {
        var index = $scope.selected.index + 1;
        if(index >= $scope.images.length){
            $scope.selected.index = 0;
        }else{
            $scope.selected.index = index;
        }
    };

    $scope.prev = function () {
        var index = $scope.selected.index - 1;
        if(index < 0){
            $scope.selected.index =  $scope.images.length - 1;
        }else{
            $scope.selected.index = index;
        }
    };
})
/*@controller :for uploading documents*/
.controller('OperatorUploadController',['$scope','$state','$stateParams','MyProfileService','ngToast','LocalStorageService',
function($scope,$state,$stateParams,MyProfileService,ngToast,LocalStorageService){
    /*
    @addDocuments
    Function:To upload the documents of driver and vehicles
    */
    $scope.document_info={};
    $scope.myFile={};
    $scope.myFile.file =[];
    $scope.addDocuments=function(id){
        $scope.document_info.document=$scope.myFile.file;
        $scope.document_info.id=$stateParams.id;
        $scope.document_info.cattype=$stateParams.type;

        console.log('This is a data',$scope.document_info);
        MyProfileService.saveDocuments($scope.document_info).then(function(data){
            console.log('data in controllers',$scope.document_info);
            if(data){
                console.log(data);
                $scope.getDocumentInfo($scope.document_info.cattype);
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Information saved!Thank you'
                });
            }
        }).catch(function (err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });

    };
    /*@getDocument
    Function:to fetch the documents
    */
    $scope.getDocumentInfo = function(id,type){
        $scope.isShow = $stateParams.type;
        MyProfileService.getDocuments($stateParams.type,$stateParams.id).then(function(data){
            if(data){
                $scope.vehicle=[];
                $scope.driver=[];
                angular.forEach(data,function(item){
                    if(item.vehicle != null && item.vehicle != ''){
                        $scope.vehicle.push(item);
                    }
                    else if(item.driver != null && item.driver != ''){
                        $scope.driver.push(item);
                    }
                });
            }
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'No information'
            });
        });

    };
    /*@deleteDocument
    function:to delete the documents
    */
    $scope.deleteDocuments=function(id){
        console.log(id);
        MyProfileService.deleteDocuments(id).then(function(){
            ngToast.dismiss();
            ngToast.create({
                className:'success',
                content:'Deleted'
            });
            $scope.getDocumentInfo($stateParams.type);

        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Not Deleted'
            });
        });
    };
}]);

//btn-block btn-signin sign-width sign-up
