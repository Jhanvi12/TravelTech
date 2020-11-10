angular.module('app.customer.services', [])
        .service('CustomerService', ['$http', '$q', function($http, $q) {

                this.getCustomerList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users?type=customer&offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getCustomer = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updateCustomer = function(user) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/users/' + user._id, user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.addNewCustomer = function(user) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/', user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.statusUpdateCustomer = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteCustomer = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.customerexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/customerexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
