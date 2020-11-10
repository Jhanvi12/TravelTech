angular.module('app.canceledride.services', [])
        .service('CanceledRideService', ['$http', '$q', function($http, $q) {

                this.getCanceledRidesList = function(offset, type, query) {
                    var deffered = $q.defer();
                    var path = "";
                    if (type) {
                        var path = '/api/v1/rides?status=canceled&all=true&offset=' + offset + '&type=' + type;
                    } else if (query) {
                        var path = '/api/v1/rides?status=canceled&all=true&offset=' + offset + '&city=' + query;
                    } else {
                        var path = '/api/v1/rides?status=canceled&all=true&offset=' + offset;
                    }
                    $http.get(path).then(function(res) {
                        console.log(res.data);
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getCanceledRide = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/rides/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateCanceledRide = function(ids) {
                    var deffered = $q.defer();
                    $http.post('api/v1/rides/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteCanceledRide = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/rides/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.approvedBidsForRide = function(id) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/bids?all=true&status=approved&ride=' + id).then(function(res) {
                        deferred.resolve(res.data);
                    }).catch(function(err) {
                        deferred.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deferred.promise;
                };

                this.fetchBidsForRide = function(id, offset, query) {
                    var deferred = $q.defer();
                    console.log(id);
                    $http.get('/api/v1/bids?all=true&ride=' + id).then(function(res) {
                        console.log(res.data);
                        deferred.resolve(res.data);
                    }).catch(function(err) {
                        deferred.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deferred.promise;
                };

                this.cancelledridesexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/rides/cancelledridesexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };



            }]);
