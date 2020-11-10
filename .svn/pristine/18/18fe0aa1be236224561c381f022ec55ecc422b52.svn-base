angular
.module('app.core.services.login', [])
//loginservice for login user
.service('LoginService',['$http', '$q', function($http, $q){


	/** Authentication **/
	this.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

    /** Login with valid email & password **/
	this.userLogin = function(data) {
		var deferred = $q.defer();
		$http.post('/api/v1/auth/signin', data).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	/** Send verification code on user email **/
	this.forgotWithEmail = function(data) {
		var deferred = $q.defer();
		$http.post('/api/v1/auth/forgot-password', data).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	/** Reset password after code verification **/
	this.resetWithCode = function(data) {
		var deferred = $q.defer();
		$http.put('/api/v1/auth/reset-password', data).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
}]);
