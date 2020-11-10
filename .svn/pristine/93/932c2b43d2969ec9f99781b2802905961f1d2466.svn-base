angular
.module('app.operator.fleet.service',[])
//service to handle myprofile section
//29 jan 16
.service('FleetService',['$http','$q',function($http,$q){

	this.addInfo=function(data){
		console.log("Mydata",data);
	 var deferred=$q.defer();
     $http.post('/api/v1/inventories',data).then(function (res){
		 	deferred.resolve(res.data);
		 }).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
	 	 });
		return deferred.promise;
	};

	this.getInventory = function(id){
        var deferred=$q.defer();
        $http.get('/api/v1/inventories/byoperator/'+id).then(function (res){
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.deleteInventory=function(id){
		console.log('CanceleRideRequest',id);
		var deferred=$q.defer();
		var data ={};
		$http.delete('/api/v1/inventories/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	this.getInventoryById = function(id){

		var deffered = $q.defer();
		$http.get('api/v1/inventories/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};

	this.updateinventoryInfo=function(operator){
	
        var deffered = $q.defer();
		$http.put('api/v1/inventories/' + operator._id,operator).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;		

	};
	this.getDriver = function(){
		var deffered = $q.defer();
		$http.get('api/v1/drivers').then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};

	this.getvehicle = function(){
		var deffered = $q.defer();
		$http.get('api/v1/vehicles').then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	//Away Taxi

	this.addawaytaxi=function(data){
		console.log("Mydata",data);
	 var deferred=$q.defer();
     $http.post('/api/v1/awayTaxi',data).then(function (res){
		 	deferred.resolve(res.data);
		 }).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
	 	 });
		return deferred.promise;
	};

	this.getAwaytaxi = function(id){
        var deferred=$q.defer();
        $http.get('/api/v1/awayTaxi/byoperator/'+id).then(function (res){
            deferred.resolve(res.data);
        }).catch(function (err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
    };

    this.getAwaytaxiById = function(id){

		var deffered = $q.defer();
		$http.get('api/v1/awayTaxi/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};


	this.deleteAwaytaxi=function(id){
		console.log('deleteAwaytaxi',id);
		var deferred=$q.defer();
		var data ={};
		$http.delete('/api/v1/awayTaxi/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	this.updateAwaytaxiInfo=function(awayTaxi){
	
        var deffered = $q.defer();
		$http.put('api/v1/awayTaxi/' + awayTaxi._id,awayTaxi).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;		

	};

}]);
