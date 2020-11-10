angular.module('app.permission.services', [])
        .service('PermissionService', ['$http', '$q', function($http, $q) {

                this.getModulesList = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/modules/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateModule = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/modules/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }
            }]);