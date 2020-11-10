angular.module('app.factory.interceptor',['app.core.services.LocalStorage'])
.factory('Interceptor', ['$q','LocalStorageService',
function($q, LocalStorageService) {
  return {

    'responseError': function(rejection) {
    	if(rejection.status==401){
      		LocalStorageService.delete('travel_tech_user');
      }
      return $q.reject(rejection);
    }

  };
}]);
