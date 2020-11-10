angular.module('app.verification',[
	'app.verification.service',
	'app.core.services.LocalStorage'
])
.controller('VerificationController',['$scope', '$stateParams', '$state', '$log', 'VerificationService', 'LoginService','ngToast','LocalStorageService',
function($scope, $stateParams, $state, $log, VerificationService, LoginService ,ngToast, LocalStorageService){
	//function for sign-up
	$scope.verifyCode=function(data){
		console.log("djgfrjdgk");
		console.log(data);
		data.uid=$stateParams.uid;
		data.type=$stateParams.type;
		VerificationService.codeVerify(data).then(function(data){

			if($stateParams.type == 'operator'){
				$state.go("operator.signupstep2", {uid:$stateParams.uid,type: $stateParams.type});
			}else{
				$state.go("welcome");
				$scope.loginAfterSignup();
			}
			ngToast.dismiss();
			ngToast.create({
				className:'success',
				content: 'verified'
			});
		}).catch(function(err){
			console.log(err);
			ngToast.dismiss();
			ngToast.create({
				className:'danger',
				content: err.message
			});
		});
	};

	//login After Signup
	$scope.loginAfterSignup = function(user){
		$scope.user=JSON.parse(sessionStorage.getItem("travel_tech_user_credentials"));
		var data = {};
		data.username=$scope.user.email;
		data.password=$scope.user.password;
		data.type=$scope.user.type;

        LoginService.userLogin(data).then(function(res){
			LocalStorageService.set("travel_tech_user", JSON.stringify(res));
            	$state.go("customer");
        }).catch(function(err){
        	$state.go("welcome");

        });

    };

}])
