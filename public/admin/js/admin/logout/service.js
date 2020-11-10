angular.module('app.logout.services', [])
//loginservice for login user
        .service('LogoutService', ['$http', '$q', function($http, $q) {
                var deferred = $q.defer();
                this.logout = function() {
                    $http.delete('/api/v1/auth/').then(function(res) {
                        deferred.resolve(res.data);
                    }).catch(function(err) {
                        deferred.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deferred.promise;
                };
            }]);