angular.module('app.operator.enquiries.service',[])
//services to get enquiries for operator of rides posted by customer
.service('EnquiriesService',['$http','$q',function($http,$q){
	/*
Services to get all rides enquiries posted by customer.
	*/
this.showEnquiries=function(offset,operator){
	var deferred=$q.defer();
	$http.get('/api/v1/rides?all=true&current_bids=true&offset=' + offset+'&operator='+operator).then(function (res){
		console.log(res)
		
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};

//this will get all vehicle types to be shown in dropdown
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

this.WatchEnquiries=function(id){
	var deferred=$q.defer();
	var data = {};
	data.ride = id;
	$http.post('/api/v1/Watchlists', data).then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};

this.showWatchEnquiries=function(){
	var deferred=$q.defer();
	$http.get('/api/v1/Watchlists').then(function (res){
		deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
};
//for deleting
this.RestoreToCurrent = function(id){

		var deffered = $q.defer();
		$http.delete('api/v1/Watchlists/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};

}])
