angular.module('app.operator.myride',
['app.operator.myride.service',
'app.operator.mybid.service',
'app.operator.enquiries.service',
'app.core.services.LocalStorage'])

.controller('OperatorMyRideController',['$scope','$state','$uibModal','MyRidesService','ngToast','$stateParams','ngTableParams','$filter','$timeout','LocalStorageService','sweet',
function($scope,$state,$uibModal,MyRidesService,ngToast,$stateParams,ngTableParams,$filter,$timeout,LocalStorageService,sweet){
    if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("operator.login");
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');

    }
    $scope.getRideList = function(status){
        MyRidesService.getMyRides(status).then(function(data){
            console.log("myData",data);
            $scope.myride = data;

        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.rideCompleted = function(id){
        MyRidesService.rideCompleted(id).then(function(data){
            _.remove($scope.myride, function(n) {
                return n.ride._id == id;
            });
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.Driver = function (id, myrideObj,bidid) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/operator/myrides/view/assign_driver.html',
            controller: 'AssignDriverController',
            resolve: {
                id: function () {
                    return id;
                },
                vehicle_quote: function(){
                    return myrideObj.vehicle_quote;
                },
                bidid:function(){
                    return bidid;
                },
                editDriverNow:function(){
                    return false;
                }
            }
            });
        modalInstance.result.then(function () {
            $scope.getRideList('upcoming');
        }, function (msg) {
            console.log(msg);
        });
    };
     /*Edit Driver Functionality in assigning driver*/
    $scope.editDriver = function (id, myrideObj,bidid) {
            var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/operator/myrides/view/assign_driver.html',
            controller: 'AssignDriverController',
            resolve: {
                id: function () {
                    return id;
                },
                vehicle_quote: function(){
                    return myrideObj.vehicle_quote;
                },
                bidid:function(){
                    return bidid;
                },
                editDriverNow:function(){
                    return true;
                }
            }
            });
        modalInstance.result.then(function () {
            $scope.getRideList('upcoming');
        }, function (msg) {
            console.log(msg);
        });
    };
     $scope.confirmCancel = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Ride?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.cancelRide(id);
                sweet.show('Deleted!', 'The Ride has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Ride is safe :)', 'error');
            }
        });
    };
    /*Functionality to cancel the ride*/
    $scope.cancelRide = function(ride_id){
        console.log('the ride id for cancellation is',ride_id);
            $scope.$emit('start',true) ;
            console.log('the id in cancel is',id);
           MyRidesService.CanceleRideRequest(ride_id).then(function(data){
            if(data){
                $scope.getRideList('upcoming');
                $timeout($scope.$emit('stop',true), 3000) ;
            }
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            console.log(err);
        });

    } ;

}])
.controller('AssignDriverController', function ($scope, id, editDriverNow, bidid,MyBidService,MyRidesService ,ngToast, $uibModalInstance, EnquiriesService, vehicle_quote) {
$scope.id= id;
$scope.bidid=bidid;
 console.log('u got the bidid',$scope.bidid);
 $scope.drivers = [];
 $scope.inEdit = editDriverNow;
 $scope.drivers.push({'name':'Select Driver','_id':'','active':false});
 $scope.driversLoaded = false;
$scope.showDriverInDropdown=function(){
    console.log('showDriverInDropdown');
    EnquiriesService.showDrivers().then(function(data){
        if(data){
              angular.forEach(data.data,function(item){
                item.active = false;
                $scope.drivers.push(item);
                $scope.driversLoaded = true;
              });
        }
    }).catch(function(err){
        console.log(err)
    });
}();
$scope.vehicle_quote = vehicle_quote;
$scope.bid = {'vehicle':[],'driver':[]};

console.log($scope.bid );
$scope.check = function(bid){
 for(var i=0;i<bid.length;i++){
    if(bid[i] == '' || bid[i] == undefined ){
                $scope.checkBid =  true;
                break;
              }
              else
              {
                 $scope.checkBid =  false;

              }
 }
 setTimeout(function(){
      return false;
 })
}
$scope.onDriverChange = function(bidId,index){
    console.log(bidId);

    angular.forEach($scope.drivers,function(item){
        //console.log(item)
         if(bidId == ''){
             if(item.indexed != undefined && item.indexed == index){
             item.active = false;
             item.indexed = '';
         }
         } else if(item._id == bidId){
             //  console.log(index);
            angular.forEach($scope.drivers,function(item1){
                if(item1.indexed != undefined && item1.indexed == index){
                     item1.active = false;
                     item1.indexed = '';
                }
            });
            item.active = true;
            item.indexed = index;
        }
    })
     console.log($scope.drivers);
}

$scope.showRideOfId=function(){
    MyRidesService.showRide($scope.id).then(function(data){
        if(data){
            $scope.ride = data;
        }
    }).catch(function(err){
        console.log(err)
    });
};
        /*To add a bid detail at bid page*/
        $scope.addMyBidInfo = function(index){
            $scope.vehicle_quote.push({});
        };
          /*To remove a bid detail at bid page*/
        $scope.removeMyBidInfo = function(parent,index){
            $scope.vehicle_quote.splice(index,1);
            $scope.bid[parent].vehicle_quote.splice(index, 1);
        };

    $scope.update = function(bid){
        console.log('The object is',bid);
        /*To update ride table with driver entry*/
        MyRidesService.UpdateRide($scope.id, bid).then(function(data){
             console.log('u are back in controller after saving in ride',data)
            $uibModalInstance.close();
            $scope.saveDriverForBid(bid);
            $scope.takeDataFromRide($scope.id);
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: 'Your bid is saved'
            });

          }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });


    };
              /*To update bid table for driver entry*/
              $scope.saveDriverForBid = function(bid){
              MyBidService.UpdateBidForDriver($scope.bidid, bid).then(function(data){
                console.log('u are back in controller after saving in bids',data)
               $uibModalInstance.close();
                ngToast.dismiss();
                ngToast.create({
                className: 'success',
                content: 'Your bid is saved'
            });
          }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });


    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.takeDataFromRide = function(){
              MyRidesService.getDataForIndividualRide($scope.id).then(function(data){
                console.log('u are back ',data)
               $uibModalInstance.close();
                ngToast.dismiss();
                ngToast.create({
                className: 'success',
                content: 'Your bid is saved'
            });
          }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });


    };

})
