angular.module('app.signup',[
	'app.core.service.signup'
])
//controller for signup
//date:23jan16
.controller('SignupController',['$scope','$rootScope','$state', '$log', 'SignupService', 'ngToast',
function($scope,$rootScope, $state, $log, SignupService, ngToast){
	//function for sign-up
	// $rootScope.show = {navigator: false};
	//	$scope.show.navigator=false;
	// match password and confirm password
	$scope.matchPassword = function(){
		if($scope.user.confirmpassword != $scope.user.password){
			$scope.notMatched = true;
		}else{
			$scope.notMatched = false;
		}
	};

	$scope.submitForSignUp=function(user){
		if(!$scope.user.type){
			ngToast.dismiss();
			ngToast.create({
				className: 'danger',
				content: "Please select user type"
			});
		}else{
			if($scope.notMatched){
				ngToast.dismiss();
				ngToast.create({
					className: 'danger',
					content: "confirm password should be same"
				});
			}else{
				SignupService.signup(user).then(function(data){
					$state.go('verification', {uid:data._id});
					ngToast.dismiss();
					ngToast.create({
						className: 'success',
						content: 'Registered Successfully'
					});
				}).catch(function(err){
					ngToast.dismiss();
					ngToast.create({
						className: 'danger',
						content: err.message
					});
				});
			}
		}

	};

}])
