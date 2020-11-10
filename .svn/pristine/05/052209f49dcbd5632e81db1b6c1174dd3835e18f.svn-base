angular
.module('app.core.services.city', [])
//loginservice for login user
.service('CityService',['$http', '$q', function($http, $q){
	/**
    * @getCityByQuery
    * function for getting city by matching value of data
    * @param data | string | city name that should be run in like query.
    **/
	this.getCityByQuery = function(data) {
		var deferred = $q.defer();
		$http.get('/api/v1/city?name=' + data).then(function(res){
			var arr=[];
			res.data.data.forEach(function(val){
				var filtered_data = {};
				filtered_data.city = val.city;
				filtered_data.state = val.state;
				filtered_data.country = 'India';
				filtered_data.zip = val.zip;
				filtered_data.cityList = val.city + ", " + val.state;
				arr.push(filtered_data);
			});
			deferred.resolve(arr);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
}]);
