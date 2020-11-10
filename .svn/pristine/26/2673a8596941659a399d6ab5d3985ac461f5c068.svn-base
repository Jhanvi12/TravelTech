angular.module('app.emailtemplate.services', [])
        .service('EmailTemplateService', ['$http', '$q', function($http, $q) {

                this.getAllEmailTemplates = function(searchQuery) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/emailtemplates?name=' + searchQuery ).then(function(res) {
                        console.log(res.data);
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };
                this.getEmailTemplateById = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/emailtemplates/'+ id).then(function(res) {
                        console.log(res.data);
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updateEmailTemplate = function(data) {
                    console.log("data",data);
                    var deffered = $q.defer();
                    $http.post('/api/v1/emailtemplates/update', data).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                };

                this.deleteEmailTemplate = function(data) {
                    console.log("data",data);
                    var deffered = $q.defer();
                    $http.post('/api/v1/emailtemplates/delete/'+data).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                };

                //
                // this.getCanceledRide = function(id) {
                //     var deffered = $q.defer();
                //     $http.get('/api/v1/rides/' + id).then(function(res) {
                //         deffered.resolve(res.data);
                //     }).catch(function(err) {
                //         deffered.reject(err);
                //     });
                //     return deffered.promise;
                // };
                //
                // this.statusUpdateCanceledRide = function(ids) {
                //     var deffered = $q.defer();
                //     $http.post('api/v1/rides/statusUpdate', ids).then(function(res) {
                //         deffered.resolve(res.data);
                //     }).catch(function(err) {
                //         deffered.reject(err);
                //     });
                //     return deffered.promise;
                // }
                //
                this.saveEmailTemplate = function(data) {
                    console.log("data",data);
                    var deffered = $q.defer();
                    $http.post('/api/v1/emailtemplates', data).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }
                //
                // this.approvedBidsForRide = function(id) {
                //     var deferred = $q.defer();
                //     $http.get('/api/v1/bids?all=true&status=approved&ride=' + id).then(function(res) {
                //         deferred.resolve(res.data);
                //     }).catch(function(err) {
                //         deferred.reject(JSON.parse(err.headers('api-meta')));
                //     });
                //     return deferred.promise;
                // };
                //
                // this.fetchBidsForRide = function(id, offset, query) {
                //     var deferred = $q.defer();
                //     console.log(id);
                //     $http.get('/api/v1/bids?all=true&ride=' + id).then(function(res) {
                //         console.log(res.data);
                //         deferred.resolve(res.data);
                //     }).catch(function(err) {
                //         deferred.reject(JSON.parse(err.headers('api-meta')));
                //     });
                //     return deferred.promise;
                // };
                //
                // this.noshowridesexportcsv = function() {
                //     console.log("export Csv service called");
                //     var deffered = $q.defer();
                //     $http.get('/api/v1/rides/noshowridesexportcsv').then(function(res) {
                //         deffered.resolve(res.data);
                //     }).catch(function(err) {
                //         deffered.reject(err);
                //     });
                //     return deffered.promise;
                // };


            }]);
