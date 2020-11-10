angular.module('app.vehicle.services', [])
        .service('VehicleService', ['$http', '$q', function($http, $q) {

                this.getVehicleList = function(offset, query, id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicles?operator=' + id + '&offset=' + offset + '&type=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getAllVehicleList = function(offset, query, id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicles?all=all&offset=' + offset + '&type=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /*will show vehicles categories
                 */
                this.showVehiclesCategory = function() {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicle_category').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.getVehicle = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicles/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.addNewVehicle = function(pdata) {
                    var deferred = $q.defer();
                    var fd = new FormData();

                    fd.append("images", pdata.images);
                    fd.append("rc", pdata.rc);
                    fd.append("permit", pdata.permit);
                    fd.append("registration_number", pdata.registration_number);
                    fd.append("category", pdata.category._id);
                    fd.append("type", pdata.type);
                    if (pdata.features && pdata.features != undefined)
                        angular.forEach(pdata.features, function(value, key) {
                            if (value != "")
                                fd.append("features[" + key + "]", value);
                        });

                    fd.append("cost_per_km", pdata.cost_per_km);
                    fd.append("capacity", pdata.capacity);
                    fd.append("operator", pdata.operator);
                    fd.append("is_active", pdata.is_active);
                    $http.post('/api/v1/vehicles', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                            .then(function(res) {
                                deferred.resolve(res.data);

                            })
                            .catch(function(err) {
                                console.log('err');
                            });
                    return deferred.promise;
                };


                /*
                 Service to update the vehicle information according to the operator.
                 */
                this.updateVehicleInfo = function(pdata) {
                    var deferred = $q.defer();
                    var fd = new FormData();
                    fd.append("images", pdata.images);
                    fd.append("registration_number", pdata.registration_number);
                    fd.append("category", pdata.category._id);
                    fd.append("type", pdata.type);
                    angular.forEach(pdata.features, function(value, key) {
                        if (value != "")
                            fd.append("features[" + key + "]", value);
                    });
                    fd.append("cost_per_km", pdata.cost_per_km);
                    fd.append("capacity", pdata.capacity);
                    $http.put('/api/v1/vehicles/' + pdata._id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                            .then(function(res) {
                                deferred.resolve(res.data);

                            })
                            .catch(function(err) {
                                console.log('err');
                            });
                    return deferred.promise;
                };

                this.statusUpdateVehicle = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/vehicles/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteVehicle = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/vehicles/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.vehiclesexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicles/vehiclesexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
