angular
.module('app.verification.service',[])
//service for signup module of operator
.service('VerificationService',['$http','$q',function($http,$q){

	/**
	* function that call api for verify user's mobile and email
	* @param | data | Object | it contains user's email and code
	**/
	this.codeVerify=function(data){
		var deferred=$q.defer();
    	$http.put('/api/v1/verify', data).then(function (res){
    		deferred.resolve(res.data);
    	}).catch(function (err){
    		deferred.reject(JSON.parse(err.headers('api-meta')));
    	});
    	return deferred.promise;
   	};
}]);
