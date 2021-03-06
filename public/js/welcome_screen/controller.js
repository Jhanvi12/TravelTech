angular.module('app.welcome', [
    'app.core.services.login',
    'app.core.services.LocalStorage',
    'app.customer.rides.service',
    'app.core.service.signup'
])
//controller for welcome page
.controller('WelcomeController', ['$scope', '$timeout', '$stateParams', 'RideService', 'LocalStorageService', 'ngToast', '$uibModal', '$state',
function($scope, $timeout, $stateParams, RideService, LocalStorageService, ngToast, $uibModal, $state){

    $scope.state={};
    $scope.state.name = $state.current.name;
    $scope.minDate = moment();
    $scope.open1 = function(index) {
        $scope.popup1[index].opened = true;
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
    $scope.dateOptions = {
    //dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = [{
        opened: false
    },{
        opened: false
    }];
    if($stateParams.modal == 'login'){
        $timeout($scope.login(), 3000);
    }else if($stateParams.modal == 'signup'){
        $scope.signup();
    }else{
        console.log("login");
    }
    $scope.ride = JSON.parse(sessionStorage.getItem("travel_tech_ride")) || {};
    $scope.ride.duration = true;
    if(!$scope.ride.routes){
        $scope.ride.route = [];
    }
    $scope.resetRide = function(){
        $scope.ride = {};
        $scope.ride.route = [];
    };
    /**
    * @submitRide
    * function for saving the ride details entered by User
    **/
    $scope.submitRide = function(form, ride_type){
        if(ride_type != 'multi_way'){
            $scope.ride.duration = true;
        }
        if(ride_type){
            $scope.ride.type = ride_type;
        }
        $scope.ride.status = "open";
        if (form) {
           form.$setPristine();
           form.$setUntouched();
         }
         var ridedata;
         ridedata = $scope.ride;
      var user = JSON.parse(localStorage.getItem('travel_tech_user'));
      if(!user){
        sessionStorage.setItem("travel_tech_ride", JSON.stringify($scope.ride));
        $scope.login();
      }else if(ridedata.passenger_count < ridedata.vehicles_count){
          ngToast.dismiss();
          ngToast.create({
              className: 'danger',
              content: 'No. of Passenger should not be no. of Vehicle'
          });
      }else if(moment(ridedata.route[0].date_time).format() < moment().format()){
          ngToast.dismiss();
          ngToast.create({
              className: 'danger',
              content: 'Invalid date & time for pickup'
          });
      }else{

        RideService.createRide(ridedata).then(function(data){
          $timeout(sessionStorage.removeItem('travel_tech_ride'), 1000);
          if(data){
              $scope.ride = {};
              $scope.ride.route = [];
          }
          $scope.$broadcast('stop',true) ;
          ngToast.dismiss();
          ngToast.create({
              className: 'success',
              content: 'Request Posted Successfully'
          });
        }).catch(function(err){
            $scope.$broadcast('stop',true) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Not Saved"
            });
        })
      }
    };
    $scope.route = [1];
    $scope.route_length = 1;
    $scope.addRouteInfo = function(){
        if($scope.route.length < 5){
            var index = $scope.route[$scope.route.length-1] + 1;
            $scope.route_length = $scope.route_length + 1;
            $scope.popup1.push({
              opened: false
            });
            var date_push = moment().format('DD-MMMM-YYYY');
            console.log($scope.route.length, "length")
            $scope.ride.route.splice($scope.route.length, 0, {date_time: date_push});
            $scope.route.push(index);
            var time_now = {
                hstep: moment().hour(),
                mstep: Math.round(moment().minute()/15) * 15
            };
            $scope.selected_time.push(time_now);
        }
    };
    $scope.removeRouteInfo = function(index){
        $scope.route.splice(index, 1);
        $scope.ride.route.splice(index, 1);
        $scope.route_length = $scope.route_length - 1;
    };
    /**
    * @Login
    * function used for openning login modal screen and send user to next state.
    **/
    $scope.login = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/welcome_screen/views/login.html',
            controller: 'LoginController'
        });
        modalInstance.result.then(function (data) {
            console.log("inside login");
            LocalStorageService.set("travel_tech_user", JSON.stringify(data));
            if(data.profile.roleKey == "customer"){
                $state.go("customer");
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: "Login successfully"
                });
            }else if(data.profile.roleKey == "operator"){
                $state.go("operator");
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: "Login successfully"
                });
            }
            else if(data.profile.roleKey == "corporate"){
                $state.go("customer");
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: "Login successfully"
                });
            }else{
                console.log('i am called');
                LocalStorageService.delete("travel_tech_user");
            }
        }, function (msg) {
            if(msg == 'forgetpassword'){
                $state.go('forgetpassword');
            }else if(msg == 'signup'){
                $scope.signup();
            }else{
                console.log(msg);
            }
        });
    };
    /**
    * @signup
    * function used for openning singup modal screen and save user details.
    **/
    $scope.signup = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/welcome_screen/views/signup.html',
            controller: 'SignupController'
        });
        modalInstance.result.then(function (data) {
            $state.go('verification', {uid:data._id, type: 'customer'});
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: 'Registered Successfully'
            });
        }, function (msg) {
            if(msg == 'forgetpassword'){
                $state.go('forgetpassword');
            }else if(msg == 'signup'){
                $scope.signup();
            }else{
                console.log(msg);
            }
        });
    };
}])
/**
* @LoginController
* controller for login modal
**/
.controller('LoginController', function ($scope, LoginService, ngToast, $uibModalInstance) {
    $scope.forgetpassword = function(){
        $uibModalInstance.dismiss('forgetpassword');
    };
    $scope.signup = function(){
        $uibModalInstance.dismiss('signup');
    }
    $scope.login = function(user){
        if(!$scope.user.type ){
           ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Choose Type"
            });
      
        }else{
        console.log('$scope.user.type ',$scope.user.type );
        LoginService.userLogin($scope.user).then(function(data){
            $uibModalInstance.close(data);
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Incorrect username & password."
            });
        });
    }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
/**
* @SignupController
* controller for signup modal
**/
.controller('SignupController', function ($scope, $uibModalInstance, ngToast, SignupService) {
    $scope.forgetpassword = function(){
        $uibModalInstance.dismiss('forgetpassword');
    };
    $scope.matchPassword = function(){
        if($scope.user.confirmpassword != $scope.user.password){
            $scope.notMatched = true;
        }else{
            $scope.notMatched = false;
        }
    };
    $scope.submitForSignUp=function(user){
         if(!$scope.user.type ){
           ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Choose Type"
            });
          
        }else{
       console.log(' $scope.user.type', $scope.user.type);
        SignupService.signup($scope.user).then(function(data){
            sessionStorage.setItem("travel_tech_user_credentials", JSON.stringify($scope.user));
            $uibModalInstance.close(data);
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
