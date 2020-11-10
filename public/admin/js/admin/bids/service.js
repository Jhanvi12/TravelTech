angular.module('app.bid.services', [])
        .service('BidService', ['$http', '$q', function($http, $q) {

                this.getBidsList = function(offset, status, query) {
                    var deffered = $q.defer();
                    var path = "";
                    if (status) {
                        var path = '/api/v1/bids?status=' + status + '&all=true&offset=' + offset;
                    } else if (query) {
                        var path = '/api/v1/bids?all=true&offset=' + offset;
                    } else {
                        var path = '/api/v1/bids?all=true&all=true&offset=' + offset;
                    }
                    $http.get(path).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getBid = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/bids/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateBid = function(ids) {
                    var deffered = $q.defer();
                    $http.post('api/v1/bids/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteBid = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/bids/deleteall', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.preferences = function(id) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/preferences').then(function(res) {
                        deferred.resolve(res.data);
                    }).catch(function(err) {
                        deferred.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deferred.promise;
                }

                this.bidsexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/bids/bidsexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
