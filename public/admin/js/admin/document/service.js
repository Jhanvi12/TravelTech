angular.module('app.document.services', [])
        .service('DocumentService', ['$http', '$q', function($http, $q) {

                this.getDocumentList = function(offset, query, id, type) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/documents?' + type + '=' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.statusUpdateDocument = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/documents/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteDocument = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/documents/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            }]);