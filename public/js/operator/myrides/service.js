angular
.module('app.operator.myride.service',[])
//service to handle myprofile section
//29 jan 16
.service('MyRidesService',['$http','$q',function($http,$q){
    this.getMyRides = function(status){
		var deffered = $q.defer();
		$http.get('api/v1/bids?ridetype='+status).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};

    this.rideCompleted = function(id){
        var deffered = $q.defer();
        var data = {};
        data.status = 'completed';
        $http.put('api/v1/rides/'+id, data).then(function(res){
            deffered.resolve(res.data);
        }).catch(function(err){
            deffered.reject(err);
        });
        return deffered.promise;
    };
    /*For updating the bids*/
    this.UpdateRide = function(id, data){
     var deffered = $q.defer();
     $http.put('api/v1/rides/' + id, data).then(function(res){
         deffered.resolve(res.data);
     }).catch(function(err){
         deffered.reject(err);
     });
     return deffered.promise;
 };
 /*Service to get the individual ride*/
this.getDataForIndividualRide = function(id){
       var deffered = $q.defer();
     $http.get('api/v1/rides/' + id).then(function(res){
         deffered.resolve(res.data);
     }).catch(function(err){
         deffered.reject(err);
     });
     return deffered.promise;
};
//CanceleRideRequest
    this.CanceleRideRequest=function(id){
        console.log('CanceleRideRequest',id);
        var deferred=$q.defer();
        var data ={};
        data.status = 'canceled';
        $http.put('/api/v1/rides/'+id, data).then(function (res){
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };


}]);
