angular
.module('app.customer.rides.service', [])
//loginservice for login user
.service('RideService',['$http', '$q', function($http, $q){

	this.createRide = function(data) {
		var deferred = $q.defer();
		$http.post('/api/v1/rides', data).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	this.fetchRequests = function(offset,status,fromdate,todate,type) {
		var deferred = $q.defer();
            if(fromdate && !todate && !type){
            	console.log("indisde first if");
            var path = '/api/v1/rides?offset=' + offset+"&fromdate="+fromdate;
		}
		else if(fromdate && !todate && type){
            	console.log("indisde first else if");

			var path = '/api/v1/rides?offset=' + offset+"&fromdate="+fromdate+"&type="+type;
		}
		else if(fromdate && todate && !type){
            	console.log("indisde second else if");

			var path = '/api/v1/rides?offset=' + offset+"&fromdate="+fromdate+"&todate="+todate;
		}else if(fromdate && todate && type){
            	console.log("indisde 3 else if");

            var path = '/api/v1/rides?offset=' + offset+"&fromdate="+fromdate+"&todate="+todate+"&type="+type;
		}else if(type && !fromdate && !todate){
            	console.log("indisde 4 else if");

			var path='/api/v1/rides?offset=' + offset+"&type="+type;
		}
        else{
            	

			var path = '/api/v1/rides?offset=' + offset;
		}
		if(status)
		{
			var path = path+"&status="+status;
		}
		$http.get(path).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	this.fetchBidsForRide = function(id){
		var deferred = $q.defer();
		$http.get('/api/v1/bids?all=true&ride='+id).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	this.bookRide = function(id){
		var deferred = $q.defer();
		var data = {};
		data.bid_status="approved";
		console.log('jhjjhjhj', id);
		$http.put('/api/v1/bids/update_status/'+id, data).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	/*will show vehicles categories
	*/
	this.showVehiclesCategory=function(){
		var deferred=$q.defer();
		$http.get('/api/v1/vehicle_category').then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	/*will show vehicles categories
	*/
	this.getLowestBids=function(id){
		console.log('Ride id in service',id);
		var deferred=$q.defer();
		$http.get('/api/v1/bids/lowestbid/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	this.getbidExpiryTime = function(){
	    var deferred=$q.defer();
	    $http.get('/api/v1/preferences').then(function (res){
	        deferred.resolve(res.data);
	    }).catch(function (err){
	        deferred.reject(JSON.parse(err.headers('api-meta')));
	    });
	    return deferred.promise;
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


//No show
	this.Noshow=function(id){
		console.log('No show',id);
		var deferred=$q.defer();
		var data ={};
		data.status = 'noshow';
		$http.put('/api/v1/rides/'+id, data).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};


		this.approvedBidsForRide = function(id){
			var deferred = $q.defer();
			$http.get('/api/v1/bids?all=true&status=approved&ride='+id).then(function(res){
				deferred.resolve(res.data);
			}).catch(function(err){
				deferred.reject(JSON.parse(err.headers('api-meta')));
			});
			return deferred.promise;
		};
		this.preferences = function(id){
			var deferred = $q.defer();
			$http.get('/api/v1/preferences').then(function(res){
				deferred.resolve(res.data);
			}).catch(function(err){
				deferred.reject(JSON.parse(err.headers('api-meta')));
			});
			return deferred.promise;
		};
       /*Get Ratings Info Service*/
       this.getRatingsInfo=function(id){
          var deferred = $q.defer();
			$http.get('/api/v1/ratings/'+id).then(function(res){
				deferred.resolve(res.data);
			}).catch(function(err){
				deferred.reject(JSON.parse(err.headers('api-meta')));
			});
			return deferred.promise;



		};
		
}]);
