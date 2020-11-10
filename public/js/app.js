angular.module('TravelTechApp',[
	'ui.router',
	'ngAnimate',
	'ui.bootstrap',
	'ngSanitize',
	'ngToast',
	'ngTable',
	'app.welcome',
	'app.logout',
	'app.customer',
	'app.operator.login',
	'app.customer.rides',
	'app.customer.feedback',
	'app.customer.congratulation',
	'app.customer.biddetails',
	'app.verification',
	'app.logout',
	'app.factory.interceptor',
	'app.core.directive.preloader',
	'app.core.filters.date',
	'app.core.filters.ride',
	'app.operator',
	'app.operator.dashboard',
	'app.operator.completeRides',
	'app.operator.enquiries',
	'app.core.filters.vehicle',
	'app.core.filters.cities',
	'app.operator.myprofile',
	'app.forgot-password',
	'app.reset-password',
	'app.operator.signup',
	'app.core.directive.filemodel',
	'app.operator.mybid',
	'app.operator.myride',
	'app.operator.fleet',
	'hSweetAlert',
	'ngFileUpload'

])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngToastProvider',
function($stateProvider, $urlRouterProvider, $httpProvider, ngToastProvider) {
	// configuration for toast message displayer
	ngToastProvider.configure({
		horizontalPosition:'center',
		verticalPosition:'top',
		animation: 'slide'
	});
	$httpProvider.interceptors.push('Interceptor');

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

	$stateProvider
	//welcome screen for traveltech page
	.state('welcome', {
		url:'/',
		templateUrl: 'js/welcome_screen/views/index.html',
		param: {modal: null},
		controller: 'WelcomeController'
	})
	// logout user
	.state('logout', {
		url:'/logout',
		templateUrl: 'js/logout/views/index.html',
		params: { state: null, last_state: null },
		controller: 'LogoutController'
	})
	// main page for customer
	.state('customer', {
		url:'/customer',
		params: { route: null },
		templateUrl: 'js/customer/views/index.html',
		controller: 'CustomerController'
	})
	// add ride page for customer
	.state('customer.createRide', {
		url:'/createRide',
		templateUrl: 'js/customer/rides/views/create_ride.html',
		controller: 'CustomerRideController'
	})
	// manage ride posted by customer
	.state('customer.myrequest', {
		url:'/myrequest',
		templateUrl: 'js/customer/rides/views/my_request.html',
		controller: 'CustomerRideController'
	})

	// manage ride posted by customer
	.state('customer.myrides', {
		url:'/myrides',
		templateUrl: 'js/customer/rides/views/myrides.html',
		controller: 'CustomerRideController'
	})

	// manage feedback controller
     .state('customer.feedbacks', {
		url:'/feedbacks',
		params: { report: null},
		templateUrl: 'js/customer/feedback/views/feedbacks.html',
		controller: 'FeedbackController'
	})
     .state('customer.biddetails', {
        url:'/biddetails',
        templateUrl: 'js/customer/bid_details/views/index.html',
        params:    {id: null,ride:null,user:null},
        controller: 'BidDetailsController'
    })


	.state('customer.ridedetails', {
		url:'/ride_details',
		templateUrl: 'js/customer/rides/views/ride_details.html',
		controller: 'CustomerRideController'
	})
	//Congratulation
	.state('customer.congratulation', {
		url:'/congratulation',
		templateUrl: 'js/customer/congratulation/views/index.html',
		controller: 'CongratulationController'
	})

	.state('customer.location', {
		url:'/location',
		templateUrl: 'js/customer/rides/views/map.html',
		controller: 'CustomerRideController'
	})
		
	//for code verification page after singup and forget password
	.state('verification',{
		url:'/verification',
		templateUrl:'js/verification/views/index.html',
		params: { uid: null, type: null },
		controller:'VerificationController'
	})
	//for forget password
	.state('forgetpassword',{
		url:'/forget-password',
		templateUrl:'js/forget_password/view/index.html',
		controller:'ForgotPasswordController'
	})
	.state('resetpassword',{
		url:'/reset-password',
		templateUrl:'js/reset_password/view/index.html',
		params: { email: null },
		controller:'ResetPasswordController'
	})
	.state('operator',{
		url:'/operator',
		templateUrl:'js/operator/index.html',
		params: { type: null },
		controller:'OperatorController'
	})
	.state('operator.login',{
		url:'/login',
		templateUrl:'js/operator/login/views/index.html',
		controller:'OperatorLoginController'
	})
	.state('operator.signupfinish',{
		url:'/registered_succesfully',
		templateUrl:'js/operator/signup/views/signup_finish.html',
		controller:'OperatorSignupController'
	})
	.state('operator.signup',{
		url:'/signup',
		templateUrl:'js/operator/signup/views/index.html',
		controller:'OperatorSignupController'
	})
	.state('operator.signupstep2',{
		url:'/signupstep2',
		templateUrl:'js/operator/signup/views/index1.html',
		params:{uid:null},
		controller:'OperatorSignupController'
	})
	.state('operator.signupstep3',{
		url:'/signupstep3',
		templateUrl:'js/operator/signup/views/index2.html',
		params:{uid:null},
		controller:'OperatorSignupController'
	})
	.state('operator.signupstep4',{
		url:'/signupstep4',
		templateUrl:'js/operator/signup/views/index3.html',
		params:{uid:null},
		controller:'OperatorSignupController'
	})

	.state('operator.dashboard',{
		url:'/dashboard',
		templateUrl:'js/operator/dashboard/views/index.html',
		controller:'OperatorDashboardController'
	})

	 .state('operator.fleet',{
        url:'/fleet-management',
        templateUrl:'js/operator/fleet/views/index.html',
        controller:'OperatorFleetController',

    })
	 .state('operator.editfleet',{
        url:'/editfleet/:id',
        templateUrl:'js/operator/fleet/views/editinventory.html',
        controller:'OperatorFleetController',

    })

	  .state('operator.fleetdetails',{
        url:'/fleetdetails/:id',
        templateUrl:'js/operator/fleet/views/fleetdetails.html',
        controller:'OperatorFleetController',

    })
	  //Away Taxi
	  .state('operator.awaytaxi',{
        url:'/fleets_holdingtime',
        templateUrl:'js/operator/fleet/views/fleetholding.html',
        controller:'OperatorFleetController',
   
    })
	   .state('operator.awaytaxidetails',{
        url:'/awaytaxidetails/:id',
        templateUrl:'js/operator/fleet/views/awaytaxidetails.html',
        controller:'OperatorFleetController',
   
    })
	   .state('operator.editawaytaxi',{
        url:'/editawaytaxi/:id',
        templateUrl:'js/operator/fleet/views/editawaytaxi.html',
        controller:'OperatorFleetController',
   
    })
	.state('operator.enquiries',{
		url:'/enquiries',
		templateUrl:'js/operator/enquiries/views/index.html',
		controller:'OperatorEnquiriesController'
	})

	.state('operator.mybid',{
		url:'/mybid',
		templateUrl:'js/operator/mybid/view/index.html',
		controller:'OperatorMyBidController'
	})
	.state('operator.myride',{
		url:'/myride',
		templateUrl:'js/operator/myrides/view/index.html',
		controller:'OperatorMyRideController'
	})
	.state('operator.watchenquiries',{
		url:'/watchenquiries',
		templateUrl:'js/operator/enquiries/views/watchEnquiries.html',
		controller:'OperatorEnquiriesController'
	})
	.state('operator.myprofile',{
		url:'/myprofile',
		templateUrl:'js/operator/myprofile/views/index.html',
		controller:'OperatorMyProfileController'
	})

	.state('operator.editvehicle',{
		url:'/editvehicle/:id',
		templateUrl:'js/operator/myprofile/views/editvehicle.html',
		controller:'OperatorEditControllerForVehicles'
	})
	.state('operator.editdriver',{
		url:'/editdriver',
		params: {id: null},
		templateUrl:'js/operator/myprofile/views/edit_driver.html',
		controller:'OperatorMyProfileController'
	})
	//completeRides
	.state('operator.completeRides',{
		url:'/completeRides',
		params: {id: null},
		templateUrl:'js/operator/completeRides/views/index.html',
		controller:'completeRidesController'
	})
 
	.state('operator.uploaddocuments',{
		url: '/uploaddocuments',
		params: {id:null,type:null},
		templateUrl: 'js/operator/myprofile/views/uploaddocuments.html',
		controller: 'OperatorUploadController'
	});

	$urlRouterProvider.otherwise("/");
}]);
