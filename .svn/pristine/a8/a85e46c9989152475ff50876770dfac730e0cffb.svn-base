angular.module('app.operator.fleet', [
	'app.core.services.LocalStorage',
	'app.operator.fleet.service',
  'vsGoogleAutocomplete',
    "ngAnimate",
    'ui.bootstrap',
    'ngTable'
])
//controller for login
.controller('OperatorFleetController', ['$scope', '$http', '$state','ngToast','LocalStorageService','FleetService','$timeout','$stateParams',"NgTableParams","$filter",'sweet' , 
function($scope, $http, $state, ngToast, LocalStorageService,FleetService,$timeout,$stateParams,ngTableParams,$filter,sweet){
  if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("operator.login");
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');
    }

  $scope.users="";
  

$scope.operator={};
 $scope.LoggedInUser =  JSON.parse(LocalStorageService.get('travel_tech_user')).profile;
      /*To add the inventories*/
    	$scope.addInfo=function(operator,form){
        $scope.operator= [{date_time: moment().format('DD-MMMM-YYYY')}];  
        $scope.operator.user=$scope.LoggedInUser.uid;
        console.log("LogedInId",$scope.operator.user);
        operator.operator_id = $scope.operator.user;
        operator.pickup_date.setHours(operator.selected_time.hstep);
        operator.pickup_date.setMinutes(operator.selected_time.mstep);
        operator.dropoff_date.setHours(operator.selected_time1.hstep);
        operator.dropoff_date.setMinutes(operator.selected_time1.mstep);
        console.log('operator', operator);
        FleetService.addInfo(operator).then(function(data){
            form.$setPristine();
            form.$setUntouched();
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Added'
                });
           $scope.operator={};    
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "process Failed"
            });
        });
	};

	 $scope.getInventory = function(){
        console.log(" Inside getInventory");
        console.log('in get inventory $scope.operator.operator_id',$scope.operator.operator_id)
        FleetService.getInventory($scope.LoggedInUser.uid).then(function(data){
        console.log('the data is',data);
        // $scope.users = data;
        $scope.users = data;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            filter: {},
            sorting: {
                'guest_name': 'asc',
                'guest_email': 'asc',
            }
        }, {
            total: $scope.users.length,
            getData: function($defer, params) {
                var filteredData = params.filter() ?
                        $filter('filter')($scope.users, params.filter()) :
                        $scope.users;
                var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        filteredData;
                params.total(orderedData.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
        }).catch(function(err){
               console.log(err)
            });
        };
   $scope.getInventory();

    /*Ask b4 confirmation*/
  $scope.confirmCancel1 = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Fleet?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
              $scope.deleteInventory(id);
                sweet.show('Deleted!', 'The Fleet has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Fleet is safe :)', 'error');
            }
        });
    }

    $scope.deleteInventory = function(id){
        console.log("shfkjhskjdfcszxkjncb",id);
         
        FleetService.deleteInventory(id).then(function(data){
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Deleted'
                });
                $scope.getInventory();
        }).catch(function(err){
             ngToast.dismiss();
             ngToast.create({
                className: 'danger',
                content: "process Failed"
            });
        });
    };

  console.log("paras id",$stateParams.id);

  FleetService.getInventoryById($stateParams.id).then(function(data){
        $scope.operators = data;
        $scope.pickupAddr = data.route[0].address.street+ ', '+ data.route[0].address.country + ', ' + data.route[0].address.state + ', ' + data.route[0].address.city + ', ' + data.route[0].address.postCode ;
        $scope.dropoffAddr = data.route[1].address.street + ', ' + data.route[1].address.country + ', ' + data.route[1].address.state + ', ' + data.route[1].address.city +', '+ data.route[1].address.postCode ;
        $scope.operators.booking_date = new Date(data.booking_date);
        $scope.operators.pickup_date = new Date(data.pickup_date);
        $scope.operators.dropoff_date = new Date(data.dropoff_date);
        $scope.operators.selected_time = {};
        $scope.operators.selected_time.hstep = $scope.operators.pickup_date.getHours();
        $scope.operators.selected_time.mstep = $scope.operators.pickup_date.getMinutes  ();
        $scope.operators.selected_time1 = {};
        $scope.operators.selected_time1.hstep = $scope.operators.dropoff_date.getHours();
        $scope.operators.selected_time1.mstep = $scope.operators.dropoff_date.getMinutes  ();
        console.log( $scope.operators.selected_time1.hstep,"$scope.operators.selected_time1.hstep");
        $scope.operators.dropoff_date = new Date(data.dropoff_date);

        ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Fetched Data'
                });    
           
        }).catch(function(err){
            
        });
  
  $scope.getdetails=function(id){
    console.log("datatatat",id);
    FleetService.getInventoryById(id).then(function(data){
        console.log("getdetails",data);
        console.log('getdetails data.guest_name',data.guest_name);
        $scope.operators = data;
        $scope.operators.booking_date = new Date(data.booking_date);
        $scope.operators.pickup_date = new Date(data.pickup_date);
        $scope.operators.dropoff_date = new Date(data.dropoff_date);
        ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Fetched Data'
                });    
           
        }).catch(function(err){
            
        });
  }

    $scope.updateinventoryInfo=function(operators){
        console.log("operator",operators);
        operators.pickup_date.setHours(operators.selected_time.hstep);
        operators.pickup_date.setMinutes(operators.selected_time.mstep);
        operators.dropoff_date.setHours(operators.selected_time1.hstep);
        operators.dropoff_date.setMinutes(operators.selected_time1.mstep);
        FleetService.updateinventoryInfo(operators).then(function(data){
             console.log("mydata",data)
             ngToast.dismiss();
             ngToast.create({
                 className: 'success',
                 content: 'Information Updated Successfully'
             });
             $state.go('operator.fleet');
            
     }).catch(function (err){
         ngToast.dismiss();
         ngToast.create({
             className: 'danger',
             content: 'Information not Updated Successfully'
         });
     });
 };





 /****** Datepicker Code*********/

   $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    //dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  // function disabled(data) {
  //   var date = data.date,
  //     mode = data.mode;
  //   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  // }

  // $scope.toggleMin = function() {
  //   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
  //   $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  // };

  // $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  
  $scope.open5 = function() {
    $scope.popup5.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];


  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.popup3 = {
    opened: false
  };

  $scope.popup4 = {
    opened: false
  };

$scope.popup5 = {
    opened: false
  };


  $scope.updateHours = function(index) {
        // console.log('$scope.selected_time[index].hstep', $scope.selected_time[index].hstep);
        $scope.operator.pickup_date.date_time.setHours($scope.selected_time[index].hstep);
    };
    $scope.updateMinutes = function(index) {
        $scope.operator.pickup_date.date_time.setMinutes($scope.selected_time[index].mstep);
        // console.log($scope.ride.route[index].date_time);
    };

  $scope.options = {
        hstep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        mstep: [0, 1, 5, 10, 15, 25, 30, 35, 40, 45, 50, 55]
    };
    $scope.selected_time = [
        {
            hstep: moment().hour(),
            mstep: Math.round(moment().minute()/15) * 15
        }
    ];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  
   $scope.getDriverInfo = function(){
       FleetService.getDriver().then(function(data){
            console.log('the driver data is ',data);
            $scope.driverInfo = data.data;
            console.log($scope.operator,"drivers_info");
        }).catch(function(err){
            console.log(err)
        });
    }();
    $scope.vehicleInfo = function(){
       FleetService.getvehicle().then(function(data){
            console.log('the vehicle Info is ',data);
            $scope.vehicleInfo = data.data;
            console.log($scope.operator,"vehicle");
        }).catch(function(err){
            console.log(err)
        });
    }();

//Away Taxi functions
    $scope.submitAwayTaxi = function(awayTaxi,form){
        console.log("Inside SubmitAwayTaxi",awayTaxi);
        $scope.awayTaxi= [{date_time: moment().format('DD-MMMM-YYYY')}];  
        $scope.awayTaxi.user=$scope.LoggedInUser.uid;
        console.log("LogedInId",$scope.awayTaxi.user);
        awayTaxi.operator_id = $scope.awayTaxi.user;
        awayTaxi.datefrom.setHours(awayTaxi.selected_time.hstep);
        awayTaxi.datefrom.setMinutes(awayTaxi.selected_time.mstep);
        awayTaxi.dateto.setHours(awayTaxi.selected_time1.hstep);
        awayTaxi.dateto.setMinutes(awayTaxi.selected_time1.mstep);
        console.log('awayTaxi', awayTaxi);
        FleetService.addawaytaxi(awayTaxi).then(function(data){
             form.$setPristine();
            form.$setUntouched();
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Added'
                });
                $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });   
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "process Failed"
            });
        });

    };

    $scope.getAwaytaxi = function(){
        console.log(" Inside getAwaytaxi");
        console.log('in get getAwaytaxi $scope.operator.operator_id',$scope.operator.operator_id)
        FleetService.getAwaytaxi($scope.LoggedInUser.uid).then(function(data){
        console.log('the data is',data);
        // $scope.users = data;
        $scope.users = data;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            filter: {},
            sorting: {
                'guest_name': 'asc',
                'guest_email': 'asc',
            }
        }, {
            total: $scope.users.length,
            getData: function($defer, params) {
                var filteredData = params.filter() ?
                        $filter('filter')($scope.users, params.filter()) :
                        $scope.users;
                var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        filteredData;
                params.total(orderedData.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
        }).catch(function(err){
               console.log(err)
            });
        };
   $scope.getInventory();

     FleetService.getAwaytaxiById($stateParams.id).then(function(data){
        $scope.awayTaxi = data;
        $scope.locations = data.route[0].address.street+ ', '+ data.route[0].address.country + ', ' + data.route[0].address.state + ', ' + data.route[0].address.city + ', ' + data.route[0].address.postCode ;
        $scope.endlocations = data.route[1].address.street+ ', '+ data.route[1].address.country + ', ' + data.route[1].address.state + ', ' + data.route[1].address.city + ', ' + data.route[1].address.postCode ;
        $scope.awayTaxi.datefrom = new Date(data.datefrom);
        $scope.awayTaxi.dateto = new Date(data.dateto);
        $scope.awayTaxi.selected_time = {};
        $scope.awayTaxi.selected_time.hstep = $scope.awayTaxi.datefrom.getHours();
        $scope.awayTaxi.selected_time.mstep = $scope.awayTaxi.datefrom.getMinutes  ();
        $scope.awayTaxi.selected_time1 = {};
        $scope.awayTaxi.selected_time1.hstep = $scope.awayTaxi.dateto.getHours();
        $scope.awayTaxi.selected_time1.mstep = $scope.awayTaxi.dateto.getMinutes  ();
        console.log( $scope.awayTaxi.selected_time1.hstep,"$scope.awayTaxi.selected_time1.hstep");
        

        ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Fetched Data'
                });    
           
        }).catch(function(err){
            
        });


   $scope.getAwaytaxidetails=function(id){
    console.log("datatatat",id);
    FleetService.getAwaytaxiById(id).then(function(data){
        console.log("getAwaytaxidetails",data);
        console.log('getAwaytaxidetails',data.priceoffer);
        $scope.awayTaxi = data;
        $scope.awayTaxi.datefrom = new Date(data.datefrom);
        $scope.awayTaxi.dateto = new Date(data.dateto);
        console.log("$scope.operatorsAwayTaxi.dateto",$scope.operatorsAwayTaxi.dateto);
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Fetched Data'
                });    
           
        }).catch(function(err){
            
        });
  }
  /*Ask b4 confirmation*/
  $scope.confirmCancel = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Away Taxi?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
              $scope.deleteAwaytaxi(id);
                sweet.show('Deleted!', 'The Away Taxi has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Away Taxi is safe :)', 'error');
            }
        });
    }
/*the main deleted function*/
   $scope.deleteAwaytaxi = function(id){
        console.log("shfkjhskjdfcszxkjncb",id);
         
        FleetService.deleteAwaytaxi(id).then(function(data){
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Successfully Deleted'
                });

                $scope.getAwaytaxi();
        }).catch(function(err){
             ngToast.dismiss();
             ngToast.create({
                className: 'danger',
                content: "process Failed"
            });
        });
    };

        $scope.updateAwaytaxiInfo=function(awayTaxi){
        console.log("awayTaxi",awayTaxi);
        awayTaxi.datefrom.setHours(awayTaxi.selected_time.hstep);
        awayTaxi.datefrom.setMinutes(awayTaxi.selected_time.mstep);
        awayTaxi.dateto.setHours(awayTaxi.selected_time1.hstep);
        awayTaxi.dateto.setMinutes(awayTaxi.selected_time1.mstep);
        FleetService.updateAwaytaxiInfo(awayTaxi).then(function(data){
             console.log("mydata",data)
             ngToast.dismiss();
             ngToast.create({
                 className: 'success',
                 content: 'Information Updated Successfully'
             });
             // $state.go('operator.fleet');
            
     }).catch(function (err){
         ngToast.dismiss();
         ngToast.create({
             className: 'danger',
             content: 'Information not Updated Successfully'
         });
     });
 };



}]);

 