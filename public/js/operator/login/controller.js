angular.module('app.operator.login', [
	'app.core.services.login',
	'app.core.services.LocalStorage'
])
//controller for login
.controller('OperatorLoginController', ['$scope', '$http', '$state','LoginService','ngToast','LocalStorageService',
function($scope, $http, $state, LoginService, ngToast, LocalStorageService){
$scope.is_loggedIn=false;

	$scope.login = function(user){

			$scope.user.type="operator";
	    
			console.log(user);
			LoginService.userLogin(user).then(function(data){
                $scope.$broadcast('start',true) ;
                LocalStorageService.set("travel_tech_user", JSON.stringify(data));
			    $scope.$broadcast('stop',true);
			    $http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(LocalStorageService.get('travel_tech_user')).token;
				console.log(data, data.profile.roleKey)
				$scope.show.menu = true;
				if(data.profile.roleKey == "customer"){
					$state.go("customer");
					ngToast.dismiss();
					ngToast.create({
						className: 'success',
						content: "Login successfully"
					});
				}else if(data.profile.roleKey == "operator" && data.profile.is_approved == true){
					$scope.show.is_approved = true;
                    $state.go("operator.dashboard");
					ngToast.dismiss();
					ngToast.create({
						className: 'success',
						content: "Login successfully"
					});
	            }else if(data.profile.roleKey == "operator" && data.profile.is_approved == false){
                    $scope.show.is_approved = false;
                    $state.go("operator.myprofile");
					ngToast.dismiss();
					ngToast.create({
						className: 'success',
						content: "Login successfully"
					});
	            }
	            else if(data.profile.roleKey == "corporate" && data.profile.is_approved == false){
                    $scope.show.is_approved = false;
                    $state.go("operator.employeedashboard");
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
}]);
