angular.module('app.driver.services', [])
        .service('DriverService', ['$http', '$q', function($http, $q) {

                this.getDriverList = function(offset, query, id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/drivers?operator=' + id + '&offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getAllDriverList = function(offset, query, id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/drivers?all=all&offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getDriver = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/drivers/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.addNewDriver = function(data) {
                    var deffered = $q.defer();
                    var fd = new FormData();
                    fd.append('profile_pic', data.profile_pic);
                    fd.append('dl', data.dl);
                    fd.append('verification', data.verification);
                    fd.append('name', data.name);
                    fd.append('phone_number', data.phone_number);
                    fd.append('operator', data.operator_id);
                    fd.append('is_active', data.is_active);
                    $http.post('/api/v1/drivers', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                /*
                 Service to update the driver information according to the operator.
                 */
                this.updateDriver = function(data) {
                    var deffered = $q.defer();
                    var fd = new FormData();
                    if (data.profile_pic) {
                        fd.append('profile_pic', data.profile_pic);
                    }
                    fd.append('first', data.name);
                    fd.append('phone_number', data.phone_number);
                    fd.append('is_active', data.is_active);
                    $http.put('/api/v1/drivers/' + data._id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateDriver = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/drivers/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteDriver = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/drivers/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }


                this.driverexportcsv = function() {
                    console.log("exposrt Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/drivers/driverexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };


            }]);
