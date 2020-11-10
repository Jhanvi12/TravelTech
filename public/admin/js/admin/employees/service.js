angular.module('app.employees.services', [])
        .service('EmployeeService', ['$http', '$q', function($http, $q) {

                this.getEmployeeList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users?type=employee&offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getEmployee = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updateEmployee = function(user) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/users/' + user._id, user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.addNewEmployee = function(user) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/', user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.statusUpdateUser = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteUser = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }
                this.employeesexportcsv = function() {
                    console.log("exposrt Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/employeesexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };


            }]);
