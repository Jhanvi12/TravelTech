angular
.module('app.operator.mybid.service',[])
//service to handle mybids section
//29 jan 16
.service('MyBidService',['$http','$q',function($http,$q){
	/*Getting bids list of open status*/
    this.getMyBids = function(status){
		var deffered = $q.defer();
		$http.get('api/v1/bids?type='+status).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	/*For fetching lowest bids rate*/
    this.getLowestBids=function(id){
		var deferred=$q.defer();
		$http.get('/api/v1/bids/lowestbid/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	/*For deleting this bids*/
       this.DeleteBid = function(id){

		var deffered = $q.defer();
		$http.delete('api/v1/bids/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
/*For updating the bids*/
    this.UpdateBid = function(id, data){
   
     var deffered = $q.defer();
     $http.put('api/v1/bids/' + id, data).then(function(res){
         deffered.resolve(res.data);
     }).catch(function(err){
         deffered.reject(err);
     });
     return deffered.promise;
 };
 /*To update bid table for driver entry*/
 this.UpdateBidForDriver= function(id, data){
 	
      console.log('The is and data for updation of bid',id,data);
     var deffered = $q.defer();
     $http.put('api/v1/bids/fordriver/' + id, data).then(function(res){
         deffered.resolve(res.data);
     }).catch(function(err){
         deffered.reject(err);
     });
     return deffered.promise;
 };
 this.showVehicles=function(){
	var deferred=$q.defer();
	$http.get('/api/v1/vehicles?approved=true').then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};
//this will get all vehicle types to be shown in dropdown
this.showDrivers=function(){
	var deferred=$q.defer();
	$http.get('/api/v1/drivers?approved=true').then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};
//Add Bidding Details
this.BiddingDetails=function(data){
	var deferred=$q.defer();
	$http.post('/api/v1/bids', data).then(function (res){
		console.log("BiddingDetails",res);
        deferred.resolve(res.data);
	}).catch(function (err){
		console.log('errrrr is',err);
		console.log('json is',JSON.parse(err.headers('api-meta')));
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};

}]);
