angular.module('app.operator.myprofile',
['app.operator.myprofile.service',
'app.operator.dashboard.service',
'app.core.services.LocalStorage'])

.controller('OperatorMyProfileController',['$scope','$state','$uibModal','MyProfileService','DashboardService','ngToast','$stateParams','ngTableParams','$filter','LocalStorageService','popupService','sweet','SignupLocalService',
'Upload','$timeout',function($scope,$state,$uibModal,MyProfileService,DashboardService,ngToast,$stateParams,ngTableParams,$filter,LocalStorageService,popupService,sweet,SignupLocalService,Upload,$timeout){
// =======
// .controller('OperatorMyProfileController',['$scope','$state','$uibModal','MyProfileService','ngToast','$stateParams','ngTableParams','$filter','LocalStorageService','popupService','sweet','$timeout','SignupLocalService',
// function($scope,$state,$uibModal,MyProfileService,ngToast,$stateParams,ngTableParams,$filter,LocalStorageService,popupService,sweet,$timeout,SignupLocalService){
// >>>>>>> .r1313


    $scope.state.name = $state.current.name;
    $scope.updateImgUrl = undefined;
    $scope.updateImgUrlId = undefined;
    $scope.updateImgUrlCompanyId = undefined;
    $scope.dynamic=0;
    var policy = {};
    policy.check = false;


    $scope.driver = {};
    if(!LocalStorageService.isLogin('travel_tech_user')){
        console.log('The value is',LocalStorageService.isLogin('travel_tech_user'));
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');
    }

    $scope.LoggedInUser =  JSON.parse(LocalStorageService.get('travel_tech_user')).profile;
    console.log($scope.LoggedInUser);


    /*Setting cars and corresponding capacity*/
    var typeobj={};
    var json_typeobj={};
    $scope.setCarandCategory=function(typeobj){
        json_typeobj = JSON.parse(typeobj);
        $scope.typeobj={'type':json_typeobj.type, 'capacity':json_typeobj.capacity};
        console.log('typeobj is',$scope.typeobj);
    };
 
     
 /*Sweet Alert for driver before deleting*/  
     $scope.confirmCancel = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Driver?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.deleteDriverInfo(id); 
                sweet.show('Deleted!', 'The Driver has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Driver is safe :)', 'error');
            }
        });
    };

   /*Sweet Alert for vehicles before deleting*/
    $scope.confirmCancelForVehicles = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Vehicle?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.deleteVehicle(id); 
                 sweet.show('Deleted!', 'The Vehicle has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Vehicle is safe :)', 'error');
            }
        });
    };
   
    /*Submit Vehicle Info*/
    /*
    date:15feb
    function name:submitVehicleInfo
    function:to save vehicle information in the database.
    param:data|files
    */
    $scope.vehicle_info = {};
    $scope.vehicle_info.features = ['false', 'false', 'music_system'];
    $scope.myFile = {};
    $scope.vehicle_info.images = {};
    $scope.vehicle_info.rc = {};
    $scope.vehicle_info.permit = {};
    $scope.submitVehicleInfo=function(form){

        $scope.vehicle_info.images = $scope.myFile.file;
        if($scope.myFile.file != undefined)
            $scope.filename = $scope.vehicle_info.images.name;
        $scope.vehicle_info.rc = $scope.myFile.rc;
        if($scope.myFile.rc != undefined)
            $scope.rcfilename = $scope.vehicle_info.rc.name;
        $scope.vehicle_info.permit = $scope.myFile.permit;
        if($scope.myFile.permit != undefined)
            $scope.permitfilename = $scope.vehicle_info.permit.name;
        $scope.vehicle_info.type=$scope.typeobj.type;
        $scope.vehicle_info.capacity=$scope.typeobj.capacity;
        MyProfileService.saveVehicleInfo($scope.vehicle_info, $scope.LoggedInUser.uid).then(function(data){
            console.log("$scope.permitfilename",$scope.permitfilename);
            form.$setPristine();
            form.$setUntouched();
            $scope.showVehicles(1);
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: 'Information saved'
            });

            $scope.random();
             $timeout(function () {
                   $scope.dynamic=0;
                   $scope.Flag = true;
            }, 2000);
            $scope.vehicle_info = {};
            $scope.myFile = {};
            $scope.category_data = {};
            $scope.filename = null;
            $scope.rcfilename = null;
            $scope.permitfilename = null;
        }).catch(function (err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });

    };

    /*Set Car in second dropdown*/
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
 
    /*Get Cities List*/
    $scope.getCityList=function(){
    MyProfileService.getCityList().then(function(data){
            console.log('The cities are',data);
            $scope.cities = data.data;
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
}();

   
    $scope.random = function() {
        console.log("random function");
        var value= 100;
        var value1 = Math.floor(value * 100);
        var type;
        $scope.showWarning = type === 'danger' || type === 'warning';
        $scope.dynamic = value1;
        // value1 = 0;
   
        console.log($scope.dynamic,"$scope.dynamic");
        $scope.type = type;
  };
 
    /**
    * @addDriverInfo
    * function user for adding new driver's information
    **/
        $scope.driver={};
    $scope.addDriverInfo = function(form){
        // $scope.driver.profile_pic =  $scope.myFile.file;
        // $scope.driver.dl =  $scope.myFile.dl;
        // $scope.driver.verification =  $scope.myFile.verification;
        $scope.driver.profile_pic = $scope.myFile.file;
        if($scope.myFile.file != undefined)
            $scope.profilepic = $scope.driver.profile_pic.name;
        $scope.driver.dl = $scope.myFile.dl;
        if($scope.myFile.dl != undefined)
            $scope.dlname = $scope.driver.dl.name;
        $scope.driver.verification = $scope.myFile.verification;
        if($scope.myFile.verification != undefined)
            $scope.verification = $scope.driver.verification.name;


        $scope.driver.profile_pic = $scope.myFile.file;
        if($scope.myFile.file != undefined)
            $scope.profilepic = $scope.driver.profile_pic.name;
        $scope.driver.dl = $scope.myFile.dl;
        if($scope.myFile.dl != undefined)
            $scope.dlname = $scope.driver.dl.name;
        $scope.driver.verification = $scope.myFile.verification;
        if($scope.myFile.verification != undefined)
            $scope.verification = $scope.driver.verification.name;

        $scope.driver.is_active = true;
        MyProfileService.saveDriver($scope.driver, $scope.LoggedInUser.uid).then(function(data){
            console.log("driver Data");
            form.$setPristine();
            form.$setUntouched();
            $scope.getDriverInfo(1);
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Successfully Added"
            });
             $scope.random();
             $timeout(function () {
                   $scope.dynamic=0;
                   $scope.Flag = true;
            }, 2000);
            $scope.driver={};
            $scope.profilepic = null;
            $scope.dlname = null;
            $scope.verification = null; 
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
    };

  /*To add homelocations*/
   $scope.home_location = [];
    $scope.addRouteInfo = function(address,index){
     console.log('address index',address,index);
     $scope.fetchdata.home_location[index + 1] = '';
     $scope.home_location.push({'address':address});
     console.log($scope.home_location);
    };

    /*Index negation for home locations*/
      $scope.removeRouteInfo = function(address,index){
      if (index > -1) {
      $scope.fetchdata.home_location.splice(index, 1);
      $scope.home_location.splice(address,1);

       }
   
};

//$scope.pan_number_entry = [];
/*To add pan number */
$scope.addPanNumber = function(pnumber){
    $scope.pan_number.push({});
    // $scope.pan_number_entry.push(pnumber);
    console.log('the array is',$scope.pan_number_entry);
     
};

$scope.JsonToArray = function (item) {
            return  Object.keys(item).map(function (k) {
                return item[k]
            });
        }

/*To remove pan number*/
$scope.removePanNumber = function(index){
     console.log('before',$scope.fetchdata.pan_number);
     $scope.fetchdata.pan_number = $scope.JsonToArray($scope.fetchdata.pan_number);
     $scope.pan_number.splice(index,1);
     // $scope.pan_number_entry.splice(index,1);
     $scope.fetchdata.pan_number.splice(index,1);
     console.log('$scope.fetchdata.pan_number after',$scope.fetchdata.pan_number);
     console.log('$scope.pan_number',$scope.pan_number);
};
/*To add Multiple service tax number*/
$scope.service_tax_number = [{}];
$scope.service_tax_number_entry = [];

$scope.addServiceTaxNumber = function(number){
   $scope.service_tax_number.push({});
   $scope.service_tax_number_entry.push(number);
   console.log('the array is',$scope.service_tax_number_entry);
};


/*To remove service tax number*/
$scope.removeServiceTaxNumber = function(index){
  console.log('before',$scope.fetchdata.service_tax_number);
     $scope.fetchdata.service_tax_number = $scope.JsonToArray($scope.fetchdata.service_tax_number);
     $scope.service_tax_number.splice(index,1);
     $scope.service_tax_number_entry.splice(index,1);
     $scope.fetchdata.service_tax_number.splice(index,1);
     console.log('$scope.fetchdata.pan_number after',$scope.fetchdata.service_tax_number);
     console.log('$scope.pan_number',$scope.service_tax_number);
};



    /**
    * @updateDriverInfo
    * function user for update driver's information
    **/
    $scope.updateDriverInfo = function(){
        $scope.driver_data.profile_pic =  $scope.myFile.file;
        $scope.driver_data.dl =  $scope.myFile.dl;
        $scope.driver_data.verification =  $scope.myFile.verification;
        MyProfileService.updateDriver($scope.driver_data).then(function(data){
            $scope.getDriverById();
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Updated Added"
            });
            $scope.random();
             $timeout(function () {
                   $scope.dynamic=0;
                   $scope.Flag = true;
                   $state.go('operator.myprofile');
            }, 2000);
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
    };
    /**
    * @deleteDriverInfo
    * function user for update driver's information
    **/
    $scope.deleteDriverInfo = function(id){
        //  if (popupService.showPopup('Really delete this?')) {
        MyProfileService.deleteDriver(id).then(function(data){
            _.remove($scope.drivers_info, function(n) {
                return n._id == id;
            });
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Deleted"
            });
            $state.go('operator.myprofile');
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
  //  }
    };
    /**
    * @getDriverInfo
    * function user for fetching driver's information
    **/
    $scope.getDriverById = function(){
        MyProfileService.getDriverById($stateParams.id).then(function(data){
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
    /**
    * @getDriverById
    * function user for fetching driver's information 
    **/
    $scope.getDriverInfo = function(page){
        var offset;
        if(!page){
            offset = 0;
        }else{
            offset = ((page - 1) * 10);
        }
        MyProfileService.getDriver(offset).then(function(data){
            console.log('the driver data is ',data);
            $scope.currentDriverPage = page ? page : 1;
            var length = data.count;
            var pageCount = length/10;
            var roundPageCount = Math.round(pageCount);
            var finalPageCount;
            if(roundPageCount >= pageCount){
                finalPageCount = roundPageCount;
            }else{
                finalPageCount = roundPageCount + 1;
            }

            $scope.pagesDriverCount = [];
            for(var i=1; i<=finalPageCount; i++){
                $scope.pagesDriverCount.push(i);
            }
            angular.forEach(data.data, function(value){
                MyProfileService.getDocuments("driver", value._id).then(function(docdata){
                    if(docdata){
                        console.log(docdata)
                        value.dl = [];
                        value.verification = [];
                        angular.forEach(docdata, function(val, index){
                            if(val.type == 'dl'){
                                value.dl.push(val);
                            }else if(val.type == 'driver_verification'){
                                value.verification.push(val);
                            }else{
                            }
                        });
                    }
                });
            });
            $scope.drivers_info = data.data;
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
/*Get bank info and personal info*/
/*To get the bank info and personal info*/
$scope.getBankInfo=function(){
 MyProfileService.getBankInfo($scope.LoggedInUser.uid).then(function(data){
    console.log('the bank data is',data);
    $scope.bank_info=data.bank_info;
    if(data.bank_info.cheque){
      $scope.myFile.cheque=data.bank_info.cheque;
      $scope.myFile.currentUrl = data.bank_info.cheque;
    }
    console.log('the scope cheque is',$scope.myFile.cheque,$scope.myFile.currentUrl);
    
    $scope.fetchdata=data.operator_info;
             ngToast.dismiss();
             ngToast.create({
                className: 'success',
                content: 'Fetched Sucessfully'
            });
          
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Something went wrong'
            });
        });
};
$scope.fetchedData = function(data){
     $scope.fetchdata=data.operator_info;
     if(data.operator_info.cancellation_policy == 'Standard'){
        policy.check = true;
     }else if(data.operator_info.cancellation_policy == 'Custom'){
         policy.check = true;
     }else{
        policy.check = false;
     }

       if($scope.fetchdata.home_location.length == 0){
        $scope.fetchdata.home_location = [];
        $scope.fetchdata.home_location[0] = '';
        console.log($scope.fetchdata.home_location);
    }
    else{
        angular.forEach($scope.fetchdata.home_location,function(item){
        item.address.name =  item.address.street+','+item.address.city+','+item.address.state+','+item.address.country;
        console.log(item.address.name)
        });
    }
     if(data.operator_info.id_proof){
      $scope.fetchdata.id_proof=data.operator_info.id_proof;
      $scope.fetchdata.abc=data.operator_info.id_proof;
  }
      if(data.operator_info.id_proof_company){
      $scope.fetchdata.id_proof_company=data.operator_info.id_proof_company;
      $scope.fetchdata.def=data.operator_info.id_proof_company;
    }
    console.log('cities',$scope.cities);
    angular.forEach($scope.cities,function(city){
    angular.forEach($scope.fetchdata.operating_location,function(item){
                if(city._id == item._id){
                     city.check = true;
                 // $scope.operating_location.push(city._id);
                if($scope.operating_location.indexOf(city._id) == -1){
                  $scope.operating_location.push(city._id);
                 }else{
             console.log('not pushed already in'); 
         }
               }
    });

    $scope.pan_number = [];
    if($scope.fetchdata.pan_number.length){
        angular.forEach($scope.fetchdata.pan_number,function(pan){
            $scope.pan_number.push({});
        });    
    }else{
        $scope.pan_number.push({});
    }

 
     $scope.service_tax_number = [];
    if($scope.fetchdata.service_tax_number.length){
        angular.forEach($scope.fetchdata.service_tax_number,function(pan){
            $scope.service_tax_number.push({});
        });    
    }else{
        $scope.service_tax_number.push({});
    }

   });
             ngToast.dismiss();
             ngToast.create({
                className: 'success',
                content: 'Fetched Sucessfully'
            });
          
}
/*To get personal info according to Logged in uid*/
$scope.fetchdata = {};
$scope.getPersonalInfo=function(){
MyProfileService.getPersonalInfo($scope.LoggedInUser.uid).then(function(data){
    console.log('the personal data is',data);
    $scope.fetchedData(data);
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Something went wrong'
            });
        });
};

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
 
    /*
    function:To show vehicles listing in form
    date:16th feb
    */
    $scope.showVehicles=function(page){
        var offset;
        if(!page){
            offset = 0;
        }else{
            offset = ((page - 1) * 10);
        }
        $scope.vehicle_pages = [];
        MyProfileService.getVehicleInfo(offset).then(function(data){
            $scope.currentVehiclePage = page?page:1;
            if(data){
                var length = data.count;
                var pageCount = length/10;
                var roundPageCount = Math.round(pageCount);
                var finalPageCount;
                if(roundPageCount >= pageCount){
                    finalPageCount = roundPageCount;
                }else{
                    finalPageCount = roundPageCount + 1;
                }

                $scope.pagesCount = [];
                for(var i=1; i<=finalPageCount; i++){
                    $scope.pagesCount.push(i);
                }
                angular.forEach(data.data,function(value){
                    var featuresString = "";
                    angular.forEach(value.features,function(item,key){
                        var comma = (key != 0) ? ", " : " ";
                        if(item != 'false' && item != false)
                        {
                            featuresString = featuresString +comma+ item;
                        }
                    });
                    value.featuresString = featuresString;
                    MyProfileService.getDocuments("vehicle", value._id).then(function(docdata){
                        if(docdata){
                            value.rc = [];
                            value.permit = [];
                            angular.forEach(docdata, function(val, index){
                                if(val.type == 'rc'){
                                    value.rc.push(val);
                                }else if(val.type == 'permit'){
                                    value.permit.push(val);
                                }else{
                                }
                            });
                        }
                    });
                });
                $scope.vehicle = data.data;
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    /*
    date:16feb
    function name:delete vehicles
    function parameters:_id of vehicle
    */
    $scope.deleteVehicle=function(id){
        console.log(id, "__")
       // if (popupService.showPopup('Really delete this?')) {
        MyProfileService.deleteVehicleInfo(id).then(function(){
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: 'Deleted Sucessfully'
            });
            $state.reload('operator.myprofile');

        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Something went wrong'
            });
        });
   // }
    };

    $scope.gotoDocumentpage = function(id,type){
        LocalStorageService.set("item_id",id);
        LocalStorageService.set("item_type",type);
        $state.go("operator.uploaddocuments");
    }

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
    
    /*Push the cities in array of operating_location to save in my profile*/
     $scope.operating_location = [];
     $scope.pushcitiesid = function(id){
       console.log('hgj', $scope.operating_location.indexOf(id));
       console.log('id', id);
       if($scope.operating_location.indexOf(id) == -1){
         $scope.operating_location.push(id);
         }else{
         $scope.operating_location.splice($scope.operating_location.indexOf(id), 1);
           }
        console.log('$scope.operating_location',$scope.operating_location);

      };

    /*@function:To submit the bank information
        @date:28 march 2016*/
        // $scope.bank_info = {};
 
        $scope.submitBankInfo=function(form,bankinfos){
      //  $scope.bank_info={};
      //  form.$setPristine();
      //  form.$setUntouched();

       
        console.log('typeof $scope.myFile.cheque == object',typeof $scope.myFile.cheque == 'object')
        if(typeof $scope.myFile.cheque != 'object'){
            console.log('$scope.myFile.cheque',$scope.myFile.cheque);
             var splitCheque = [];
             var stringImg = $scope.myFile.cheque;
                 splitCheque = stringImg.split('/');
             var splitedImgName = splitCheque[splitCheque.length - 1];
           
            bankinfos.cheque=splitedImgName;
            console.log('$scope.myFile',splitedImgName);
         }
         else
         {
            bankinfos.cheque=$scope.myFile.cheque;
         }
     //    bankinfos.id_proof = $scope.myFile.id_proof;
        console.log('The bank details are',bankinfos);
        console.log('the logged in users id is',$scope.LoggedInUser.uid);
        MyProfileService.saveBankInfo(bankinfos,$scope.LoggedInUser.uid).then(function(data){
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: 'Saved Sucessfully'
            });

            $scope.random();
             $timeout(function () {
                   $scope.dynamic=0;
                   $scope.Flag = true;
                  $state.reload();
            $scope.bank_info={};
            }, 2000);
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Something went wrong'
            });
        });
    };
    /*To set preview of id proof*/
    $scope.fileChanged = function(input){
        console.log("input",input);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
             $scope.updateImgUrl = e.target.result;
              console.log($scope.updateImgUrl)
                $scope.$apply();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };
    /*For preview of id proof*/
     $scope.fileChangedId = function(input){
        console.log("input",input);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
             $scope.updateImgUrlId = e.target.result;
              console.log($scope.updateImgUrlId)
                $scope.$apply();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

 /*To set id proof of company*/
   $scope.fileChangedIdCompany = function(input){
        console.log("input",input);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
             $scope.updateImgUrlIdCompany = e.target.result;
              console.log($scope.updateImgUrlIdCompany)
                $scope.$apply();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    /*@function:To submit the personal information
      @date:28 march 2016*/
 //   $scope.fetchdata = {};
    $scope.savePersonalInfo=function(form,fetchdata){
     //   $scope.fetchdata={};
      //  form.$setPristine();
      //  form.$setUntouched();
      console.log('fetchdata',fetchdata);
       if(typeof fetchdata.id_proof != 'object' && fetchdata.id_proof != undefined){
            console.log('Id prrof',fetchdata.id_proof);
             var tempImg = fetchdata.id_proof;
              $scope.picID = tempImg;
             var splitCheque = [];
             var stringImg = fetchdata.id_proof;
                 splitCheque = stringImg.split('/');
                 var splitedImgName = splitCheque[splitCheque.length - 1];
                 fetchdata.id_proof=splitedImgName;
               
         }
         else
         {
             $scope.picID = $scope.fetchdata.id_proof;
                 fetchdata.id_proof=$scope.fetchdata.id_proof;
         }

          if(typeof fetchdata.id_proof_company != 'object' && fetchdata.id_proof_company != undefined){
            console.log('$scope.myFile.cheque',fetchdata.id_proof_company);
             var splitCheque = [];
             var tempImg = fetchdata.id_proof_company;
              $scope.picIDCompany = tempImg;
             var stringImg = fetchdata.id_proof_company;
                 splitCheque = stringImg.split('/');
                 var splitedImgName = splitCheque[splitCheque.length - 1];
                 fetchdata.id_proof_company=splitedImgName;
                
         }
         else
         {
             $scope.picIDCompany = $scope.fetchdata.id_proof_company;
            console.log('$scope.fetchdata.id_proof_company ', $scope.fetchdata.id_proof_company);
                 fetchdata.id_proof_company=$scope.fetchdata.id_proof_company;
         }

        // console.log('The personal details are',fetchdata);
        // console.log('operating location',$scope.operating_location);
        fetchdata.operating_location = $scope.operating_location;
        fetchdata.service_tax_number = $scope.fetchdata.service_tax_number;
        fetchdata.pan_number = $scope.fetchdata.pan_number;
        // console.log('$scope.id proof id_proof_company',$scope.myFile.id_proof,$scope.myFile.id_proof_company);
        // console.log('the logged in users id is fetchdata',$scope.LoggedInUser.uid,fetchdata);
        // console.log('fetchdata ', fetchdata);
        MyProfileService.savePersonalInfo(fetchdata,$scope.LoggedInUser.uid).then(function(data){
          $scope.fetchedData(data);
         

            }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className:'danger',
                content:'Something went wrong'
            });
        });
    };

    
    /*@:fileChanged : To set the preview for file selected at Bank Info page
     @date:11May2016*/
    $scope.fileChanged = function(input){
        console.log("input",input);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
             $scope.updateImgUrl = e.target.result;
              console.log($scope.updateImgUrl)
                $scope.$apply();
            };

            reader.readAsDataURL(input.files[0]);
        }
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
/*Edit controller whole*/
.controller('OperatorEditControllerForVehicles',['$scope', '$state', '$stateParams', 'MyProfileService', 'ngToast', 'LocalStorageService','$timeout',
function($scope, $state, $stateParams, MyProfileService, ngToast, LocalStorageService,$timeout){
 $scope.vehicle_info = {category:''};
 $scope.category_data = {};
 $scope.dynamic=0;

 /*second dd*/
/*Show the value in dropdown box
 */
 $scope.setCar=function(category_id,category_type){
     console.log('The category id is',category_id);
       console.log('The category type is',category_type);
     MyProfileService.showDefaultVehiclesInDropdown(category_id).then(function(data){
         if(data){
             console.log('the data according to category is',data);
             $scope.category_data.types = data;
             if(category_type != undefined){
                  angular.forEach($scope.category_data.types,function(item){
                if(item.type == category_type)
                    $scope.category_data.selectedType = item;
                    $scope.typeobj = item;
             })
             }
             else{
                  $scope.category_data.selectedType = $scope.category_data.types[0];
                  $scope.typeobj = $scope.category_data.types[0];
             }
           
         }
     }).catch(function(err){
         console.log(err);
     });
 };


/*Setting cars and corresponding capacity*/
  var typeobj={};
  var json_typeobj={};
 $scope.setCarandCategory=function(typeobj){
  $scope.typeobj = typeobj;
  console.log('typeobj is',typeobj);
};
$scope.random1 = function() {
        console.log("random1 function");
        var value= 100;
        var value1 = Math.floor(value * 100);
        var type;
        $scope.showWarning = type === 'danger' || type === 'warning';
        $scope.dynamic = value1;
        // value1 = 0;
   
        console.log($scope.dynamic,"$scope.dynamic");
        $scope.type = type;
  };

    $scope.random1 = function() {
        console.log("random1 function");
        var value= 100;
        var value1 = Math.floor(value * 100);
        var type;
        $scope.showWarning = type === 'danger' || type === 'warning';
        $scope.dynamic = value1;
        // value1 = 0;
   
        console.log($scope.dynamic,"$scope.dynamic");
        $scope.type = type;
  };


 /*
 name:editUser
 function:to edit drivers
 date:4th feb 16
 */
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
 }();

 /*
 date:15feb
 function name:updateVehicleInfo
 function:to save vehicle information in the database.
 param:data|files
 */
 $scope.vehicle_info = {};
 $scope.myFile = {};
 $scope.updateVehicleInfo=function(){

     // $scope.vehicle_info.images = $scope.myFile.file ;
     // $scope.vehicle_info.rc = $scope.myFile.rc;
     // $scope.vehicle_info.permit = $scope.myFile.permit;
      $scope.vehicle_info.images = $scope.myFile.file;
        if($scope.myFile.file != undefined)
            $scope.filename = $scope.vehicle_info.images.name;
        $scope.vehicle_info.rc = $scope.myFile.rc;
        if($scope.myFile.rc != undefined)
            $scope.rcfilename = $scope.vehicle_info.rc.name;
        $scope.vehicle_info.permit = $scope.myFile.permit;
        if($scope.myFile.permit != undefined)
            $scope.permitfilename = $scope.vehicle_info.permit.name;
     $scope.vehicle_info.category = $scope.vehicleCategoryId;
     $scope.vehicle_info.type=$scope.typeobj.type;
     $scope.vehicle_info.capacity=$scope.typeobj.capacity;
     console.log('the final data ',$scope.vehicle_info);
     MyProfileService.updateVehicleInfo($stateParams.id,$scope.vehicle_info).then(function(data){

             
            
             $scope.random1();
             $timeout(function () {
                   $scope.dynamic=0;
                   $scope.Flag = true;
                   $state.go('operator.myprofile');
                    ngToast.dismiss();
                    ngToast.create({
                 className: 'success',
                 content: 'Information saved'
             });
            }, 1000);
             $scope.vehicle_info = {};
             $scope.myFile = {};
     }).catch(function (err){
         ngToast.dismiss();
         ngToast.create({
             className: 'danger',
             content: 'Information not saved'
         });
     });
 };
 $scope.showVehiclesInDropDown=function(){
     MyProfileService.showVehiclesCategory().then(function(data){
         if(data){
             console.log(data);
             $scope.options = data;
         }
     }).catch(function(err){
         ngToast.dismiss();
         ngToast.create({
             className: 'danger',
             content: 'Information not saved'
         });
     });
 };
}])

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
}])
.controller('VeiwArrayImageController', function ($scope, $uibModalInstance, images) {
    $scope.images = images;
    console.log(images)
    $scope.index=  0;
    $scope.selected = {
        item: $scope.images,

    };

    $scope.next = function () {
        var index = $scope.index + 1;
        if(index >= $scope.images.length){
            $scope.index = 0;
        }else{
            $scope.index = index;
        }

    };

    $scope.prev = function () {
        var index = $scope.index - 1;
        if(index < 0){
            $scope.index =  $scope.images.length - 1;
        }else{
            $scope.index = index;
        }
    };
});
// ng-repeat="carc in category_data track by $index"