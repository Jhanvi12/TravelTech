angular.module('app.operator.signup.service',[])
//services to get enquiries for operator of rides posted by customer
.service('SignupLocalService',['$http','$q',function($http,$q){
	/*
Services to get all rides enquiries posted by customer.
	*/
this.getDataById=function(id){
	var deferred=$q.defer();
	console.log(id);
	$http.get('/api/v1/users/'+id).then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};


 this.getCityList=function(){
   var deferred=$q.defer();
	$http.get('/api/v1/city').then(function (res){
     deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
 };

 this.getStateList=function(){
   var deferred=$q.defer();
	$http.get('/api/v1/state').then(function (res){
     deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
 };
 /* It will show vehicles categories in second dropdown
	*/
	this.showDefaultVehiclesInDropdown=function(id){
		var deferred=$q.defer();
		var offset;
		var query;
		$http.get('/api/v1/default_vehicle/throughcategory/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};


}])
