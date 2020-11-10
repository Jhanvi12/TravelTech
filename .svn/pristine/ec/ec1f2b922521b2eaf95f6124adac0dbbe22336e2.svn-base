angular.module('app.operator.services', [])
        .service('OperatorService', ['$http', '$q', function($http, $q) {

                this.getOperatorList = function(offset, query, cities) {
                    console.log("servicecities",cities);
                    var deffered = $q.defer();
                    $http.get('/api/v1/users?type=operator&offset=' + offset + '&name=' + query +'&name1='+ cities).then(function(res) {
                        deffered.resolve(res.data);
                        console.log("resdata",res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getOperator = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updateOperator = function(user) {
                    var deffered = $q.defer();
                    $http.put('/api/v1/users/' + user._id, user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.addNewOperator = function(user) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/', user).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.statusUpdateOperator = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.deleteOperator = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                this.operatorexportcsv = function(search,cities) {
                    console.log("$scope.globalSearchTerm",search);
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/operatorexportcsv/'+search+'/'+cities).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };
            }]);
