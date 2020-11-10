angular
.module('app.core.service.signup',[])
//service for signup
.service('SignupService',['$http','$q',function($http,$q){

	/**
	* function that call api for creating user's account
	* @param | data | Object | it contains user's information required for signup
	**/
	this.signup=function(data){
		console.log(data);
	 var deferred=$q.defer();
     $http.post('/api/v1/auth/signup',data).then(function (res){
		 	deferred.resolve(res.data);
		 }).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
	 	 });
		return deferred.promise;
	};

	// /*@function:For signup at 2nd step operator*/
	// this.signuptotal=function(data,id){
	// 		console.log(data,id);
	// 		console.log(data.address);
	// 	 var deferred=$q.defer();
	//           $http.put('/api/v1/users/'+id,data).then(function (res){
	// 		 	deferred.resolve(res.data);
	// 		 }).catch(function (err){
	// 			deferred.reject(JSON.parse(err.headers('api-meta')));
	// 	 	 });
	// 		return deferred.promise;
	// 	};

	this.signuptotal=function(data,id){
            console.log(data,id);
            console.log(data.address);
            var databank={};
                databank.ifsc_code=data.ifsc_code;
                databank.bank_name=data.bank_name;
                databank.account_name=data.account_name;
                databank.account_number=data.account_number;
                databank.bank_branch=data.bank_branch;
                databank.branch_address=data.branch_address;

            var datapersonal={};
                 datapersonal.vendor_city=data.vendor_city;
                 datapersonal.vendor_address=data.vendor_address;
                 datapersonal.owner_name=data.owner_name;
                 datapersonal.owner_phone_number=data.owner_phone_number;
                 datapersonal.working_hours=data.working_hours;
                 datapersonal.service_tax_number=data.service_tax_number;
                 datapersonal.pan_number=data.pan_number;
                 datapersonal.website=data.website;
                 datapersonal.cancellation_policy=data.cancellation_policy;
                 datapersonal.operating_location=data.operating_location;

              var deferred=$q.defer();
              $http.put('/api/v1/users/'+id,data).then(function (res){
                 deferred.resolve(res.data);
             }).catch(function (err){
                deferred.reject(JSON.parse(err.headers('api-meta')));
              });
                $http.put('/api/v1/users/'+id+'/bank_info',databank).then(function (res){
                 deferred.resolve(res.data);
             }).catch(function (err){
                deferred.reject(JSON.parse(err.headers('api-meta')));
              });
                 $http.put('/api/v1/users/'+id+'/personal_info',datapersonal).then(function (res){
                 deferred.resolve(res.data);
             }).catch(function (err){
                deferred.reject(JSON.parse(err.headers('api-meta')));
              });
            return deferred.promise;
        };


}]);
