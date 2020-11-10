angular.module('app.core.service.vehicleCategories',[])
//services to get enquiries for operator of rides posted by customer
.service('VehicleCategories',['$http','$q',function($http,$q){

    //this will get all vehicle types to be shown in dropdown
    this.getVehicleCategoriesList = function(){
        var deferred=$q.defer();
        $http.get('/api/v1/vehicle_category').then(function (res){
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };
}]);
