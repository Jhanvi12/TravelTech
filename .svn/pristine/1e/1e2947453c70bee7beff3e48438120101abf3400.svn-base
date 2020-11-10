angular.module('app.customer.rides', [
    'app.customer.rides.service',
    'app.core.services.LocalStorage',
    'app.core.services.city',
    'app.core.service.vehicleCategories',
    'vsGoogleAutocomplete',
    'app.operator.myprofile.service',
    'app.customer.feedback.service'
])
.controller('CustomerRideController', ['$scope', '$state', '$log', 'RideService', 'CityService', 'ngToast', 'VehicleCategories', '$timeout', 'LocalStorageService', 'FeedbackService','sweet',
function($scope, $state, $log, RideService, CityService, ngToast, VehicleCategories, $timeout, LocalStorageService, FeedbackService,sweet){
    $scope.show={};
    var todaydate=moment();
    $scope.isFeedback= function(id){
        FeedbackService.getRide(id).then(function(data){ 
            if(data){
                $scope.isFeedbackSubmitted = true;
            }else{
                $scope.isFeedbackSubmitted = false;
            }

        }).catch(function(err){
            $scope.isFeedbackSubmitted = false;
        });
    };
    $scope.todaydate=todaydate;
    $scope.biddetails = function(id){
        $state.go('customer.biddetails', {id: id});
    }
    $scope.calcTotalAmount = function(qoute){
        if(!qoute){
            qoute = [];
        }
        var totalAmount = 0;
        qoute.forEach(function(val){
            totalAmount = totalAmount + val.bid_amount;
        });
        return totalAmount;
    };

    $scope.resetRide = function(){
        $scope.ride = {};
        $scope.ride.route = [];
    };

    $scope.ride = JSON.parse(sessionStorage.getItem("travel_tech_ride")) || {};
    if(!$scope.ride.routes){
        $scope.ride.route = [];
    }

    if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("welcome");
    }


    $scope.updateHours = function(index) { 
        $scope.ride.route[index].date_time.setHours($scope.selected_time[index].hstep);
    };
    $scope.updateMinutes = function(index) {
        $scope.ride.route[index].date_time.setMinutes($scope.selected_time[index].mstep); 
    };
    /**
    * @submitRide
    * function for saving the ride details entered by User
    **/
    $scope.submitRide = function(form, ride_type){
 
        $scope.operatorBid_approval_time = '';
        if(ride_type){
            $scope.ride.type = ride_type;
        }if(!$scope.ride.status){
            $scope.ride.status = "open";
        }
        var ridedata;
            if(JSON.parse(sessionStorage.getItem("travel_tech_ride"))){
            ridedata = JSON.parse(sessionStorage.getItem("travel_tech_ride"));
        }else{
            ridedata = $scope.ride;
        }
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        var user = JSON.parse(localStorage.getItem('travel_tech_user'));
        if(!user){
            sessionStorage.setItem("travel_tech_ride", JSON.stringify($scope.ride));
            $state.go('welcome');
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
            RideService.preferences().then(function(data){ 
            $scope.bidding_time_limit = data.bidding_time_limit;
            $scope.bidding_acceptance_time = {};
            $scope.bidding_acceptance_time.twodays =data.bidding_acceptance_time.less_than_2_days;
            $scope.bidding_acceptance_time.threedays = data.bidding_acceptance_time.between_3_4_days;
            $scope.bidding_acceptance_time.fourdays =data.bidding_acceptance_time.more_than_4_days;
            $scope.workingdaysfrom = data.working_daysfrom;
            $scope.workingdaysto = data.working_daysto;
            $scope.workingstarttime = data.working_starttime;
            $scope.workingendtime = data.working_endtime;
            $scope.timeDiffernce = data.time_Differnce;

            created = new Date();
            ridedata.bid_end_time_customer = bidEndTime(created,ridedata.route[0].date_time);
            ridedata.bid_end_time_operator = $scope.operatorBid_approval_time;
 
            $scope.$emit('start',true); 
            RideService.createRide(ridedata).then(function(data){
                $timeout(sessionStorage.removeItem('travel_tech_ride'), 1000);
                if(data){
                    $state.go('customer.myrequest');
                    $scope.ride = {};
                    $scope.ride.route = [];

                }
                $timeout($scope.$emit('stop',true), 3000) ;
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Request Posted Successfully'
                });
            }).catch(function(err){
                $scope.$emit('stop',true) ;
                ngToast.dismiss();
                ngToast.create({
                    className: 'danger',
                    content: err.message
                });
            })
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });

        }
    };


    if(JSON.parse(sessionStorage.getItem("travel_tech_ride")) && $state.current.name == 'customer.createRide'){
        $scope.ride_from_session =  true;
        $scope.submitRide();
    }
    $scope.show.navigator = LocalStorageService.isLogin('travel_tech_user') ? true : false;
    $scope.ride.route = [{date_time: moment().format('DD-MMMM-YYYY')}];
    $scope.tabs = [true, false, false, false, false]
    $scope.state.name = $state.current.name;
    $scope.minDate = moment();
    $scope.open1 = function(index) {
        $scope.popup1[index].opened = true;
    };
    $scope.open2 = function(index) {
        $scope.popup2[index].opened = true;
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
    $scope.popup2 = [{
        opened: false
    },{
        opened: false
    }];


    /** @fetchingUserRequests
    * function used for fetching user's enquiry list
    **/
    $scope.fetchingUserRequests = function(page,fromdate,todate, value){
 
        var offset; 
 
        if(!page){
            offset = 0;
        }else{
            offset = ((page - 1) * 10);
        }
        $scope.$emit('start',true) ;
        RideService.preferences().then(function(data){
            $scope.bidding_time_limit = data.bidding_time_limit;
            $scope.bidding_acceptance_time = {};
            $scope.bidding_acceptance_time.twodays =data.bidding_acceptance_time.less_than_2_days;
            $scope.bidding_acceptance_time.threedays = data.bidding_acceptance_time.between_3_4_days;
            $scope.bidding_acceptance_time.fourdays =data.bidding_acceptance_time.more_than_4_days;
            $scope.workingdaysfrom = data.working_daysfrom;
            $scope.workingdaysto = data.working_daysto;
            $scope.workingstarttime = data.working_starttime;
            $scope.workingendtime = data.working_endtime;
            $scope.timeDiffernce = data.time_Differnce;
            return  RideService.fetchRequests(offset,'open',fromdate,todate,value);
        }).then(function(data){

            $scope.currentPage = page ? page : 1;
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

            angular.forEach(data.data,function(item){
                var created = item.created; 
                var bidEndTimeVal = bidEndTime(created,item.route[0].date_time);
                item.bid_approval_time = moment(bidEndTimeVal).utc().format('MMMM Do YYYY, h:mm:ss a');
                $scope.tobecomparedate =  moment().utc().format('MMMM Do YYYY, h:mm:ss a');
                item.bidendtime = moment.utc(item.bid_exp_time, 'MMMM Do YYYY, h:mm:ss a').local().format('MMMM Do YYYY, h:mm:ss a');
                $scope.momentpickup=moment(item.route[0].date_time).format('MMMM Do YYYY, h:mm:ss a');

            });
            $scope.request_data = data.data; 
            $timeout($scope.$emit('stop',true), 3000) ;
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });

    };

    function bidEndTime(created,date_time){
 
                created = moment(created).format();
                var ridecreatedtime = moment(created).format('h:mm:ss a');
                var ridecreatedday = moment(created).format('dddd');
                var today = new Date(created);
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                var anotherDay = new Date(date_time);

                var dd1 = anotherDay.getDate();
                var mm1 = anotherDay.getMonth() + 1; //January is 0!
                var yyyy1 = anotherDay.getFullYear();
                var time = anotherDay.getTime();
                var totalTime;
    
                var date1 = new Date(yyyy + "/" + mm + "/" + dd);
                var date2 = new Date(yyyy1 + "/" + mm1 + "/" + dd1);
    
                var days_remaining = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
   
                if(days_remaining <= 2 ){
                    // item.bid_approval_time = moment(created).add($scope.bidding_acceptance_time.twodays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a'); 
                    var rideStartTime = moment(created).add($scope.bidding_acceptance_time.twodays, 'hours').format('h:mm:ss a');
                    var beginningTime = moment(rideStartTime, 'h:mma');
                    var endTime = moment($scope.workingendtime, 'h:mma');

                    /**To check the End time of working hours is before or after the Ride Created time*/
                    if(endTime.isBefore(beginningTime)){
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created,$scope.bidding_acceptance_time.twodays,0, days_remaining);
                        return bid_approval_time;
                    } else {
                        var now  = created;
                        var then = new Date(mm+'/'+dd+'/'+ yyyy + ' ' + endTime.format('h:mm:ss'));
                        var result = moment.duration(moment(created).diff(moment(then)));
                        var hours = moment(result).utc().format('h');
                        var hoursDiff = $scope.bidding_acceptance_time.twodays-hours;
                       /** If time difference exceed the bid acceptance time then it will follow the condition below */
                       if(hoursDiff<=0 && ridecreatedday!='Saturday' && ridecreatedday!="Sunday" ){   
                      
                         $scope.operatorBid_approval_time = moment(created).add($scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                         return moment(created).add($scope.bidding_acceptance_time.twodays + $scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                       } else {
                  
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created,$scope.bidding_acceptance_time.twodays,result,days_remaining);   
                        return bid_approval_time;
                       }

                       
                    }
                    

                } else if(days_remaining >= 3 && days_remaining <= 4){
  

                    // item.bid_approval_time = moment(created).add($scope.bidding_acceptance_time.threedays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a'); 
                    var rideStartTime = moment(created).add($scope.bidding_acceptance_time.threedays, 'hours').format('h:mm:ss a');
                    var beginningTime = moment(rideStartTime, 'h:mma');
                    var endTime = moment($scope.workingendtime, 'h:mma');

                    /**To check the End time of working hours is before or after the Ride Created time*/
                    if(endTime.isBefore(beginningTime)){
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created,$scope.bidding_acceptance_time.threedays,0, days_remaining);
                       return bid_approval_time;
                    } else {
                        var now  = created;
                        var then = new Date(mm+'/'+dd+'/'+ yyyy + ' ' + endTime.format('h:mm:ss'));
                        var result = moment.duration(moment(created).diff(moment(then)));
                        var hours = moment(result).utc().format('h');
                        var hoursDiff = $scope.bidding_acceptance_time.threedays-hours;
                       /** If time difference exceed the bid acceptance time then it will follow the condition below */
                       if(ridecreatedday!='Saturday' && ridecreatedday!="Sunday" ){   
                    
                          $scope.operatorBid_approval_time = moment(created).add($scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                          var bid_approval_time = moment(created).add($scope.bidding_acceptance_time.threedays + $scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                          return bid_approval_time;
                       } else {
                 
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created,$scope.bidding_acceptance_time.threedays,result, days_remaining);   
                        return bid_approval_time ;
                       }                      
                    }
                } else if (days_remaining > 4) {
                    // item.bid_approval_time = moment(created).add( $scope.bidding_acceptance_time.fourdays + $scope.bidding_time_limit, 'h').format('MMMM Do YYYY, h:mm:ss a'); 
                    var rideStartTime = moment(created).add( $scope.bidding_acceptance_time.fourdays, 'hours').format('h:mm:ss a');
                    var beginningTime = moment(rideStartTime, 'h:mma');
                    var endTime = moment($scope.workingendtime, 'h:mma');

                    /**To check the End time of working hours is before or after the Ride Created time*/
                    if(endTime.isBefore(beginningTime)){
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created, $scope.bidding_acceptance_time.fourdays,0, days_remaining);
                        return bid_approval_time ;
                    } else {
                        var now  = created;
                        var then = new Date(mm+'/'+dd+'/'+ yyyy + ' ' + endTime.format('h:mm:ss'));
                        var result = moment.duration(moment(created).diff(moment(then)));
                        var hours = moment(result).utc().format('h');
                        var hoursDiff = $scope.bidding_acceptance_time.fourdays-hours;
                        /** If time difference exceed the bid acceptance time then it will follow the condition below */
                       if(ridecreatedday!='Saturday' && ridecreatedday!="Sunday" ){  
                         $scope.operatorBid_approval_time = moment(created).add($scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'); 
                         return bid_approval_time = moment(created).add( $scope.bidding_acceptance_time.fourdays + $scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                       } else {
                        var bid_approval_time = checkWorkingHours(ridecreatedday,ridecreatedtime, created, $scope.bidding_acceptance_time.fourdays,result, days_remaining);   
                        return bid_approval_time;
                       }  
                    }    
                }
     }

    /**
    **/
    function checkWorkingHours(ridecreatedday, ridecreatedtime, created,bidding_acceptance_time,diff,days_remaining){
       
         if (ridecreatedday==$scope.workingdaysto && ridecreatedtime >=$scope.workingendtime){
                    var bid_approval_time = moment(created).add($scope.bidding_acceptance_time.fourdays + $scope.bidding_acceptance_time.fourdays + $scope.timeDiffernce + bidding_acceptance_time + diff + $scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    $scope.operatorBid_approval_time = moment(created).add($scope.bidding_acceptance_time.fourdays + $scope.bidding_acceptance_time.fourdays + $scope.timeDiffernce + diff + $scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    return bid_approval_time ;
                } else if(ridecreatedday=="Saturday"){
                    /*Start Bidding End time from Monday if ride is booked on saturday*/
                    var mondayDate = new Date(created);
                    var numberOfDaysToAdd = 2;
                    mondayDate.setDate(mondayDate.getDate() + numberOfDaysToAdd);
                    var month = mondayDate.getMonth() + 1;
                    var day = mondayDate.getDate();
                    var year = mondayDate.getFullYear();
                    /***End***/
                    /*Calculate the Start Time from Monday Office Hours*/
                    var datetime = new Date(month+'/'+day+'/'+year+' '+$scope.workingstarttime);  
                    var bid_approval_time = moment(datetime).add(bidding_acceptance_time + $scope.bidding_time_limit  , 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');//MMMM Do YYYY, h:mm:ss a
                    $scope.operatorBid_approval_time = moment(datetime).add($scope.bidding_time_limit  , 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');//MMMM Do YYYY, h:mm:ss a
                    return bid_approval_time ;
                } else if (ridecreatedday=="Sunday"){
                    /*Start Bidding End time from Monday if ride is booked on sunday*/
                     var mondayDate = new Date(created);
                    var numberOfDaysToAdd = 1;
                    mondayDate.setDate(mondayDate.getDate() + numberOfDaysToAdd);
                    var month = mondayDate.getMonth() + 1;
                    var day = mondayDate.getDate();
                    var year = mondayDate.getFullYear();
                    /***End***/
                    /*Calculate the Start Time from Monday Office Hours*/
                    var datetime = new Date(month+'/'+day+'/'+year+' '+$scope.workingstarttime);  
                    var bid_approval_time = moment(datetime).add(bidding_acceptance_time + $scope.bidding_time_limit,'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    $scope.operatorBid_approval_time = moment(datetime).add($scope.bidding_time_limit,'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    return bid_approval_time ;
                } else {
                    var bid_approval_time = moment(created).add($scope.bidding_time_limit +  bidding_acceptance_time , 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    $scope.operatorBid_approval_time = moment(created).add($scope.bidding_time_limit, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    return bid_approval_time ;  
                }
    }
    
    
    /**
    * @getCitiesList
    * function for fetching the list of all cities
    **/
    $scope.getCitiesList = function(city){
        return CityService.getCityByQuery(city).then(function(result){
            $scope.$emit('start',true) ;
            return result;
            $scope.$emit('stop',true) ;
        });
    };

    /**
    * @getVehicleCategories
    * function that calls api for fetching list of vehicle categories
    **/
    $scope.getVehicleCategories = function(){
        VehicleCategories.getVehicleCategoriesList().then(function(data){
            $scope.$emit('start',true) ;
            $scope.vehicle_categories = data;
            $timeout($scope.$emit('stop',true), 3000) ;
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };

    $scope.vehicle_info = [1];
    $scope.addVehicleInfo = function(){
        var index = $scope.vehicle_info[$scope.vehicle_info.length-1] + 1;
        $scope.vehicle_info.push(index);
    };
    $scope.removeVehicleInfo = function(index){
        $scope.vehicle_info.splice(index, 1);
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

    $scope.updateHours = function(index) {
        $scope.ride.route[index].date_time.setHours($scope.selected_time[index].hstep);
    };
    $scope.updateMinutes = function(index) {
        $scope.ride.route[index].date_time.setMinutes($scope.selected_time[index].mstep);
    };

    $scope.getbidExpiryTime = function(){
        $scope.$emit('start',true) ;
        RideService.getbidExpiryTime().then(function(data){
            $scope.bidding_time_limit = data.bidding_time_limit;
            $scope.less_than2days = data.bidding_acceptance_time.less_than_2_days;
            $scope.between3to4days = data.bidding_acceptance_time.between_3_4_days;
            $scope.morethan4days = data.bidding_acceptance_time.more_than_4_days;
            //$scope.vehicle_categories = data;
            $timeout($scope.$emit('stop',true), 3000) ;
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };
    $scope.getbidExpiryTime();


    /*Passing the value for sorting of data */
    $scope.goValue=function(value){
        // $scope.value=value;
        $scope.goDate($scope.rr_date_time1,$scope.rr_date_time,value);
    };

    /*Sorting according to prices*/
    $scope.sortingforPrice=function(v){
        if(v == 1){
            $scope.bidArray.sort(function(a, b) {
                return parseFloat(a.totalAmount) - parseFloat(b.totalAmount);
            });
        }
        else{
            $scope.bidArray.sort(function(a,b){
                return parseFloat(b.totalAmount) - parseFloat(a.totalAmount);
            });
        }
    };
    /*To pass date for sorting*/
    /*Function for setting date for sorting according to date,value*/
    $scope.goDate=function(fromdate,todate,type){
        var page;
        $scope.dateobj1=fromdate;
        $scope.dateobj=todate;
        $scope.value=type;
        $scope.fetchingUserRequests(page,$scope.dateobj1,$scope.dateobj,$scope.value);
    };


    /*To fetch bid detail for particular bids*/
    $scope.getBidDetails = function(id, index){
        $scope.getLowestBids(id);
        $scope.$emit('start',true) ;
        RideService.fetchBidsForRide(id).then(function(data){
            var bidArray=[];
            $scope.bidArray=data.data;
            angular.forEach(data.data, function(val){
                val.totalAmount = $scope.calcTotalAmount(val.vehicle_quote);
                 $scope.operator_id=val.operator._id;
                 $scope.getRatingsInfo($scope.operator_id);
                angular.forEach(val.vehicle_quote,function(item){
                    val.cat=item.vehicle.category;
                });

            });
            $scope.request_data[index].bids = data.data;
            $timeout($scope.$emit('stop',true), 3000) ;
        }).catch(function(err){
           $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };

    $scope.feedback = function(ride){
        var vehicle = [];
        var driver = [];
        $scope.bidArray.forEach(function(val){
            val.vehicle_quote.forEach(function(val1){
                vehicle.push(val1.vehicle._id);
                driver.push(val1.driver);
            });

        });

        var data = {};
        data.vehicle_details =vehicle;
        data.driver_details = driver;
        data.ride = ride;
        $state.go('customer.feedbacks', {report: data});
    }

    /**
    * @getVehicleCategories
    * function that calls api for fetching list of vehicle categories
    **/
    $scope.getVehicleCategories = function(){
        $scope.$emit('start',true) ;
        VehicleCategories.getVehicleCategoriesList().then(function(data){
            $scope.vehicle_categories = data;
            $timeout($scope.$emit('stop',true), 3000) ;
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };

    /*Show the value in dropdown box
    */
    $scope.showVehiclesInDropDown=function(){
        $scope.$emit('start',true) ;
        RideService.showVehiclesCategory().then(function(data){
            if(data){
                $scope.vehicle_ctg = data;
                $timeout($scope.$emit('stop',true), 3000) ;
            }
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    }();
    /*To fetch lowest bids*/
    $scope.getLowestBids=function(id){
        $scope.$emit('start',true) ;
        $scope.ride_Id=id;
        RideService.getLowestBids(id).then(function(data){
            if(data){
                $scope.lbid=data.amount;
                $timeout($scope.$emit('stop',true), 3000) ;
                angular.forEach( $scope.request_data,function(item){
                    if($scope.ride_Id== item._id){
                        item.lbid=$scope.lbid ;
                    }
                });
            }
        }).catch(function(err){
          $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };

    $scope.fetchingMyRides = function(page, status){
        var offset;
        if(!page){
            offset = 0;
        }else{
            offset = ((page - 1) * 10);
        }
        $scope.$emit('start',true) ;
        if(status){
            RideService.fetchRequests(offset, status).then(function(data){
            $scope.currentPage = page ? page : 1;
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
            $scope.myrides = data.data;
            angular.forEach(data.data, function(data1){
                angular.forEach(data1.route, function(data2){
                var geocoder;
                var map;
                  geocoder = new google.maps.Geocoder();
                  var latlng = new google.maps.LatLng(-34.397, 150.644);
                  var mapOptions = {
                    zoom: 8,
                    center: latlng
                  }
                   //map = new google.maps.Map(document.getElementById("map"), mapOptions);
                  geocoder.geocode( { 'address': data2.address.city}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      //map.setCenter(results[0].geometry.location);
                      var pos = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                          };
                      var apiKey = '046724037139118eacc26798f8704297';
                        var url = 'https://api.forecast.io/forecast/';
                        $.getJSON(url + apiKey + "/" + pos.lat + "," + pos.lng + "?callback=?", function(data) {
                              var weather = {
                                CelsiusTemp : Math.round((((data.currently.temperature - 32) * 5)/9)*10)/10,
                                Humidity : data.currently.humidity,
                                cloudCover : data.currently.cloudCover,
                                icon : data.currently.icon,
                                summary : data.currently.summary,
                                timezone : data.timezone,
                            };
                            //$scope.weather = weather;
                            if(data2.address.city){
                             data2.address.weather = weather;
                         }
                            });
                    } else {
                      alert("Geocode was not successful for the following reason: " + status);
                    }
                  });
                  });
                  });
            $timeout($scope.$emit('stop',true), 3000) ;
            }).catch(function(err){
                $timeout($scope.$emit('stop',true), 3000) ;
                    ngToast.dismiss();
                    ngToast.create({
                        className: 'danger',
                        content: err.message
                    });
            });
        } else {
            $timeout($scope.$emit('stop',true), 3000) ;
        }
    };

    $scope.getAprrovedBid = function(id, index){
        $scope.getLowestBids(id);
        $scope.$emit('start',true) ;
        RideService.approvedBidsForRide(id).then(function(data){

            var bidArray=[];
            $scope.bidArray=data.data;
            $timeout($scope.$emit('stop',true), 3000) ;
            angular.forEach(data.data, function(val){
                val.totalAmount = $scope.calcTotalAmount(val.vehicle_quote);
                angular.forEach(val.vehicle_quote,function(item){
                    val.cat=item.vehicle.category;
                });
            });
            $scope.myrides[index].bids = data.data;
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };

    /** @CanceleRideRequest
    * function used for updating cancel RideStatus
    **/
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
                 $scope.CanceleRideRequest($scope.ride_Id);
                sweet.show('Deleted!', 'The Ride has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Ride is safe :)', 'error');
            }
        });
    };
    /** @CanceleRideRequest
    * function used for updating cancel RideStatus
    **/
    $scope.CanceleRideRequest=function(id){
        $scope.ride_Id=id;
        $scope.$emit('start',true) ;
        RideService.CanceleRideRequest(id).then(function(data){

            if(data){
                $scope.fetchingUserRequests($scope.currentPage);
                $state.reload();
                $timeout($scope.$emit('stop',true), 3000) ;
            }else{
                  $state.reload();
                  $scope.fetchingUserRequests($scope.currentPage);
            }
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };
      $scope.confirmNoShow = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Put in No Show?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.Noshow($scope.ride_Id);
                sweet.show('Deleted!', 'The Ride has been put to No Show.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Ride is safe :)', 'error');
            }
        });
    };

    $scope.Noshow=function(id){
        $scope.ride_Id=id;
        $scope.$emit('start',true) ;
        RideService.Noshow(id).then(function(data){
            if(data){
                $scope.fetchingUserRequests($scope.currentPage);
                // $timeout($scope.$emit('stop',true), 3000) ;
                $state.go('customer.myrequest');
            }
        }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });
        });
    };



$scope.bookRide = function(bidId,rideId){ 
        $state.go('customer.biddetails',{id:bidId,ride:rideId,user:$scope.request_data});
        // RideService.bookRide(bidId._id).then(function(data){
        //     $state.go('customer.biddetails',{id:bidId,ride:rideId,user:$scope.request_data});
        //     ngToast.dismiss();
        //     ngToast.create({
        //         className: 'success',
        //         content: "Successfully Added"
        //     });
        //    }).catch(function(err){
        //     console.log(err);
        // });
    };
    /*Get Ratings Info*/
    /*Get rating info*/
$scope.getRatingsInfo=function(operator_id){



    RideService.getRatingsInfo(operator_id).then(function(data){

     $scope.ratingss=data;
      angular.forEach( $scope.request_data,function(item){
             item.ratings=$scope.ratingss;

            });
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Successfully fetched"
            });
            }).catch(function(err){
            $timeout($scope.$emit('stop',true), 3000) ;
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: err.message
            });

        });
    };

    /////////geolocation api//////////
    $scope.geolocation = function(){

        // you can specify the default lat long
            var map,
                currentPositionMarker,
                mapCenter = new google.maps.LatLng(14.668626, 121.24295),
                map;

            // change the zoom if you want
        $scope.initializeMap =  function()
            { 
                map = new google.maps.Map(document.getElementById('map'), {
                   zoom: 10,
                   center: mapCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
            }

            function locError(error) {
                // tell the user if the current position could not be located
                alert("The current position could not be found!");
            }

            // current position of the user
            function setCurrentPosition(pos) {
                currentPositionMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ),
                    title: "Current Position"
                });
                map.panTo(new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ));
            }

            $scope.displayAndWatch = function (position) { 
                // set current position
                setCurrentPosition(position);

                // watch position
                watchCurrentPosition();
            }

            function watchCurrentPosition() { 
                var positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                    });
            }

            function setMarkerPosition(marker, position) { 
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
            }

            function initLocationProcedure() { 
                $scope.initializeMap();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition($scope.displayAndWatch, locError,{maximumAge:Infinity, timeout:5000, enableHighAccuracy:true});
                } else {
                    // tell the user if a browser doesn't support this amazing API
                    alert("Your browser does not support the Geolocation API!");
                }
            }

            // initialize with a little help of jQuery
            // $(document).ready(function() {
            //     initLocationProcedure();
            // });
            angular.element(document).ready(function () {
            initLocationProcedure();
        });
        // var map = new google.maps.Map(document.getElementById('map'), {
        //     center: {lat: -34.397, lng: 150.644},
        //     zoom: 6
        //   });
        //   $scope.map = map;
        //   var infoWindow = new google.maps.InfoWindow({map: map});
        //
        //   // Try HTML5 geolocation.
        //   if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //       var pos = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //       };
        //
        //       infoWindow.setPosition(pos);
        //       infoWindow.setContent('Location found.');
        //       map.setCenter(pos);
        //     }, function() {
        //       handleLocationError(true, infoWindow, map.getCenter());
        //     });
        //   } else {
        //     // Browser doesn't support Geolocation
        //     handleLocationError(false, infoWindow, map.getCenter());
        //   }
        //
        // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent(browserHasGeolocation ?
        //                         'Error: The Geolocation service failed.' :
        //                         'Error: Your browser doesn\'t support geolocation.');
        // }
    }

}]);
