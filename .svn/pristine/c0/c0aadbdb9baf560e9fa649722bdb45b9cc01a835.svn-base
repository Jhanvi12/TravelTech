angular.module('app.default_vehicle.services', [])
        .service('default_vehicleService', ['$http', '$q', function($http, $q) {

                /* Fetching all default vehicles data */
                this.getDefaultVehicleList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/default_vehicle?offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular vehicle data based on id */
                this.getDefaultVehicle = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/default_vehicle/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Update particular vehicle data based on id */
                this.updateDefaultVehicle = function(vehicle) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/default_vehicle/' + vehicle._id, vehicle).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Add new vehicle */
                this.addNewDefaultVehicle = function(vehicle) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/default_vehicle/', vehicle).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };


                /* Delete particular vehicle data based on id */
                this.deleteDefaultVehicle = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/default_vehicle/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };
                /* Delete particular vehicle data based on id */
                this.statusUpdate = function(ids) {
                    console.log("dta",ids);
                    var deffered = $q.defer();
                    $http.post('/api/v1/default_vehicle/statusUpdate', ids).then(function(res) {
                        console.log(res.data)
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

                // this.statusUpdateVehicle = function(ids) {
                //     var deffered = $q.defer();
                //     $http.post('/api/v1/vehicles/statusUpdate', ids).then(function(res) {
                //         deffered.resolve(res.data);
                //     }).catch(function(err) {
                //         deffered.reject(err);
                //     });
                //     return deffered.promise;
                // }

                // this.deleteVehicle = function(ids) {
                //     var deffered = $q.defer();
                //     $http.post('/api/v1/vehicles/delete', ids).then(function(res) {
                //         deffered.resolve(res.data);
                //     }).catch(function(err) {
                //         deffered.reject(err);
                //     });
                //     return deffered.promise;
                // }

            }]);