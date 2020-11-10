angular.module('app.city.services', [])
        .service('CityService', ['$http', '$q', function($http, $q) {
                /* Fetching all cities data */
                this.getCityList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/city?offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular city data based on id */
                this.getCity = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/city/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Update particular city data based on id */
                this.updateCity = function(city) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/city/' + city._id, city).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Add new city */
                this.addNewCity = function(city) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/city/', city).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                /* Delete particular city data based on id */
                this.deleteCity = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/city/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.cityexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/city/cityexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
