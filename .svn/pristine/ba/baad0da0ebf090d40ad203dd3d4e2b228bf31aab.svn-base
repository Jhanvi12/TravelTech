angular.module('app.login', [
	'app.core.services.login',
	'app.core.services.LocalStorage'
])
//controller for login
.controller('LoginController', ['$scope', '$state','LoginService','ngToast','LocalStorageService',
function($scope, $state, LoginService, ngToast, LocalStorageService){
	$scope.login = function(user){
		if(!$scope.user.type){
			ngToast.dismiss();
			ngToast.create({
				className: 'danger',
				content: "Please select user type"
			});
		}else{
			$scope.$broadcast('start',true) ;
			LoginService.userLogin(user).then(function(data){
				LocalStorageService.set("travel_tech_user", JSON.stringify(data));
				$scope.$broadcast('stop',true);
				console.log(data, data.profile.roleKey)
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
				}else{
					LocalStorageService.delete("travel_tech_user");
				}
			}).catch(function(err){
				$scope.$broadcast('stop',true) ;
				ngToast.dismiss();
				ngToast.create({
					className: 'danger',
					content: "Incorrect username & password."
				});
			});
		};
	}
}]);
