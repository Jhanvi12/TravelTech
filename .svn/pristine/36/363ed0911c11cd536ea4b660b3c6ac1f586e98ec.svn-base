angular.module('app.operator.dashboard', ['app.operator.dashboard.service'])
//controller of dashboard for operator
.controller('OperatorDashboardController', ['$scope', '$state','LocalStorageService','DashboardService', 'ngToast',
function($scope, $state,LocalStorageService,DashboardService, ngToast){

    if(!LocalStorageService.isLogin('travel_tech_user')){
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');
    }
    
         $scope.LoggedInUser =  JSON.parse(LocalStorageService.get('travel_tech_user')).profile;
         console.log($scope.LoggedInUser.uid);
    $scope.state.name = $state.current.name;
    /*To show bids of that id on the dashboard*/
    $scope.getBid = function(){
        $scope.bids={};
        DashboardService.showBid($scope.LoggedInUser.uid).then(function(data){
            console.log("bids areeee",data);
            var countbid=data.length;
            $scope.countbid=countbid;
            $scope.bids = data;
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });
    }();
    /*To show current enquiries of that id on the dashboard*/
    $scope.showEnquiries=function(page){
         var operator=$scope.LoggedInUser.uid;
            var offset;
         if(!page){
                offset = 0;
            }else{
                offset = ((page - 1) * 10);
            }

        $scope.enquiries={};
        DashboardService.showEnquiries(offset,operator).then(function(data){
            console.log(data, "enquiries ")
            console.log('The length is',data.count);
            $scope.currentenqcount=data.count;
            $scope.enquiries = data.data;
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: 'Information not saved'
            });
        });
    }();

    /*Get watch enquiry count*/
    $scope.getWatchEnquiries = function(){
        DashboardService.showWatchEnquiries().then(function(data){
            console.log('dataaaa',data);
            if(!data){
                $scope.watchEnquiries=0;
            }else{
                $scope.watchEnquiries = data.length;
            }
            console.log('the scope wach enq is',  $scope.watchEnquiries);
        }).catch(function(err){
            console.log(err);
        })
    }();
    /*Get upcoming rides*/
    $scope.getUpcomingRideList = function(status){
        DashboardService.getMyRides(status).then(function(data){
            $scope.upcomingRide = data;
            if(!data){
                $scope.upcomingRide=0;
            }else{
                $scope.upcomingRide = data.length;
            }
        }).catch(function(err){
            console.log(err);
        });
    };

}]);
