angular.module('app.corporate.services', [])
        .service('CorporateService', ['$http', '$q', function($http, $q) {

                this.getCorporateList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users?type=corporate&offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.getCorporate = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

               this.statusUpdateCorporate = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.deleteCorporate = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/users/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };
                
                 this.corporateexportcsv = function() {
                    console.log("export Csv service called");
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/corporateexportcsv').then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

              
                this.deleteCorporateSingle = function(ids) {
                    var deffered = $q.defer();
                    $http.delete('/api/v1/users/'+ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                this.updateCorporateSingle = function(user,id){
                    var deffered = $q.defer();
                    $http.put('/api/v1/users/'+id,user).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise; 
                };

                this.addCorporateSingle = function(user){
                     var deffered = $q.defer();
                    $http.post('/api/v1/users/',user).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise; 

                };
             

            }]);
