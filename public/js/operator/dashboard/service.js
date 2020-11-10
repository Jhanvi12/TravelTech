angular.module('app.operator.dashboard.service',[])
//services to get enquiries for operator of rides posted by customer
.service('DashboardService',['$http','$q',function($http,$q){
	/*Services to get all current enquiries for operator who is login now.*/
	this.showBids=function(){
		var offset = 0;
		var deferred=$q.defer();
		$http.get('/api/v1/bids?all= true').then(function (res){
			console.log(res)
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

   this.showBid=function(id){
		var offset = 0;
		var deferred=$q.defer();
		$http.get('/api/v1/bids/foroperator/'+id).then(function (res){
			console.log(res)
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
 

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
	/*Get watch enquiry count*/
	this.showWatchEnquiries=function(){
		var deferred=$q.defer();
		$http.get('/api/v1/Watchlists').then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	/*Get upcoming rides*/
	this.getMyRides = function(status){
		var deffered = $q.defer();
		$http.get('api/v1/bids?ridetype='+status).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	
}])
