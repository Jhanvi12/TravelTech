angular.module('app.openleads.services', [])
        .service('OpenLeadService', ['$http', '$q', function($http, $q) {

                this.getOpenLeadsList = function(offset, type, query) {
                    var deffered = $q.defer();
                    var path = "";
                    if (type) {
                        var path = '/api/v1/rides?status=open&all=all&offset=' + offset + '&type=' + type;
                    } else if (query) {
                        var path = '/api/v1/rides?status=open&all=all&offset=' + offset + '&city=' + query;
                    } else {
                        var path = '/api/v1/rides?status=open&all=all&offset=' + offset;
                    }
                    $http.get(path).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getOpenLead = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/rides/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateOpenLead = function(ids) {
                    var deffered = $q.defer();
                    $http.post('api/v1/rides/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteOpenLead = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/rides/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

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

                this.preferences = function(id) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/preferences').then(function(res) {
                        deferred.resolve(res.data);
                    }).catch(function(err) {
                        deferred.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deferred.promise;
                };

                this.openleadsexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/rides/openleadsexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
