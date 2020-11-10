angular.module('app.customer.biddetails', [
  'app.core.services.LocalStorage',
  'app.customer.biddetails.service',
  'app.customer.rides.service',
 ])
.controller('BidDetailsController', ['$scope', '$state', '$stateParams', '$timeout', 'LocalStorageService', 'BidDetailsService','RideService', 'ngToast',
function($scope, $state, $stateParams,$timeout, LocalStorageService, BidDetailsService,RideService,ngToast){

    if(!$stateParams.id){
        $state.go('customer.myrequest')
    }

console.log('The state params is',$stateParams);
$scope.bookingdate = $stateParams.id.created;
$scope.guest_name = $stateParams.ride.customer.name;
$scope.guest_phone_number = $stateParams.ride.customer.phone_number;
$scope.guest_email = $stateParams.ride.customer.email;
$scope.operator_id = $stateParams.id.operator._id;
$scope.bid_id = $stateParams.id._id;
$scope.bid_status = "approved";
$scope.ride_status = "upcoming";


var vehicleArray = [];
angular.forEach($stateParams.id.vehicle_quote[0].vehicle,function(item){
  vehicleArray.push(item.id._id);
})

  angular.forEach($stateParams.user,function(item){
  if(item._id == $stateParams.ride._id){
    $scope.bidendtime=item.bidendtime;
  }
});
 
    /*For accepting bids and posting inventories*/
    $scope.acceptBid = function(){
    console.log('the array is',vehicleArray);
    $scope.data = {};
    $scope.data.ride_id = $stateParams.ride._id;
    $scope.data.guest_name =  $scope.guest_name ;
    $scope.data.guest_phone_number =  $scope.guest_phone_number;
    $scope.data.booking_date =  $scope.bookingdate;
    $scope.data.guest_email = $scope.guest_email;
    $scope.data.operator_id = $scope.operator_id;
    $scope.data.bid_id = $scope.bid_id;
    $scope.data.bid_status= $scope.bid_status;
    $scope.data.vehicle = vehicleArray;
console.log('$scope.data.bid_id', $scope.data.bid_id)
              RideService.bookRide($scope.data.bid_id).then(function(data){
           
        
                BidDetailsService.postInventories($scope.data).then(function(data){

                // console.log('We successfully posted inventories',data);
                $state.go("customer.myrides");
                ngToast.dismiss();
                ngToast.create({
                  className: 'success',
                  content: "Successfully Accepted"
               });
                }).catch(function(err){
              console.log('The error is',err);
              ngToast.dismiss();
              ngToast.create({
                className: 'danger',
                content: "Something went Wrong."
            });
        });
              }).catch(function(err){
              console.log('The error is',err);
              ngToast.dismiss();
              ngToast.create({
                className: 'danger',
                content: "Something went Wrong."
            });
        });

   };


}]);
