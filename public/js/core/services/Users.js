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
}]);