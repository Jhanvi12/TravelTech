angular
.module('app.customer.feedback.service', [])
//loginservice for login user
.service('FeedbackService',['$http', '$q', function($http, $q){


this.ratingInfo=function(data){
	var deferred=$q.defer();
	$http.post('/api/v1/feedback', data).then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};

this.getRide=function(id){
	var deferred=$q.defer();
	$http.get('/api/v1/feedback/ride/'+id).then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};


}]);
