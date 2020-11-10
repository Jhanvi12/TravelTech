angular.module('app.vehicle_category.services', [])
        .service('vehicle_categoryService', ['$http', '$q', function($http, $q) {

                /* Fetching all vehicle categories data */
                this.getVehicleCategoryList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicle_category?category=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular vehicle category data based on id */
                this.getVehicleCategory = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/vehicle_category/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Update particular vehicle category data based on id */
                this.updateVehicleCategory = function(category) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/vehicle_category/' + category._id, category).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Add new vehicle category */
                this.addNewVehicleCategory = function(category) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/vehicle_category/', category).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                /* Delete particular vehicle category data based on id */
                this.deleteVehicleCategory = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/vehicle_category/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            }]);