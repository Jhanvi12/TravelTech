angular.module('app.preference.services', [])
        .service('PreferenceService', ['$http', '$q', function($http, $q) {

                this.getPreference = function() {
                    var deffered = $q.defer();
                    $http.get('/api/v1/preferences').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.addPreference = function(preference) {
                    var deffered = $q.defer();
                    console.log(preference, "*****");
                    $http.post('/api/v1/preferences', preference).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updatePreference = function(preference) {
                    var deffered = $q.defer();
                    console.log(preference, "*****");
                    $http.put('/api/v1/preferences', preference).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };
            }]);