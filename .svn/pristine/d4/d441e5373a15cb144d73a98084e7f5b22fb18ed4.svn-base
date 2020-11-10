angular.module('app.core.service.Count',[])
//services to get count of customer, operator
.service('Count',['$http','$q',function($http,$q){

    //this will get all users count either customer or operator
    this.getUsersCount = function(type){
        var deferred=$q.defer();
        $http.get('/api/v1/users?type='+type).then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getRequestsCount = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/rides?status=open&all=all').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getDriversCount = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/drivers?all=all').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getVehiclesCount = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/vehicles?all=all').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getEmployeesCount = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/users?type=employee').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getCitiesCount = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/city').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getRidesCount = function(type){
        var deferred=$q.defer();
        $http.get('/api/v1/rides?status='+type+'&all=true').then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getModulesList = function(id){
        var deferred=$q.defer();
        $http.get('/api/v1/modules/' + id).then(function(res) {
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };
}]);