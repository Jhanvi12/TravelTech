angular
.module('app.operator.myprofile.service',[])
//service to handle myprofile section
//29 jan 16
.service('MyProfileService',['$http','$q',function($http,$q){
	/*
	Service to save the driver information according to the operator.
	*/
	this.saveDriver = function(data, uid){
		var deffered = $q.defer();
		var fd = new FormData();
		fd.append('profile_pic', data.profile_pic);
		fd.append('dl', data.dl);
		fd.append('operator', uid);
		fd.append('verification', data.verification);
		fd.append('name', data.name);
		fd.append('last', data.last);
		fd.append('phone_number', data.mobile);
		fd.append('is_active', data.is_active);
		$http.post('api/v1/drivers', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	/*
	Service to update the driver information according to the operator.
	*/
	this.updateDriver = function(data){
		var deffered = $q.defer();
		var fd = new FormData();
		console.log(data.profile_pic);
		if(data.profile_pic){
			fd.append('profile_pic', data.profile_pic);
		}if(data.dl){
			fd.append('dl', data.dl);
		}if(data.verification){
			fd.append('verification', data.verification);
		}
		fd.append('first', data.name);
		fd.append('phone_number', data.phone_number);
		$http.put('api/v1/drivers/' + data._id, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	/*
	Service to get the driver information according to the operator.
	*/
	this.getDriver = function(offset){
		var deffered = $q.defer();
		$http.get('api/v1/drivers?offset='+offset).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	/*
	Service to get the driver information according to the operator.
	*/
	this.getDriverById = function(id){

		var deffered = $q.defer();
		$http.get('api/v1/drivers/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};
	/*
	Service to delete driver information according to the operator.
	*/
	this.deleteDriver = function(id){

		var deffered = $q.defer();
		$http.delete('api/v1/drivers/' + id).then(function(res){
			deffered.resolve(res.data);
		}).catch(function(err){
			deffered.reject(err);
		});
		return deffered.promise;
	};

	/*
	Service:saveVehicleInfo
	Service params: files
	Service info:To save the vehicle information of operator.
	*/
	this.saveVehicleInfo=function(pdata, uid){
		console.log('data before appending to fd in service is :',pdata);
		console.log(pdata.images);
		var deferred=$q.defer();
		var fd = new FormData();
		fd.append('operator', uid);
		fd.append("images", pdata.images);
		fd.append("rc", pdata.rc);
		fd.append("permit", pdata.permit);
		fd.append("capacity", pdata.capacity);
		fd.append("registration_number",pdata.registration_number);
		fd.append("category",pdata.category);
		fd.append("type",pdata.type);
		if(pdata.features && pdata.features != undefined)
		angular.forEach(pdata.features,function(value,key){
			if(value != "")
			fd.append("features["+key+"]",value);
		});

		fd.append("cost_per_km",pdata.cost_per_km);
		$http.post('/api/v1/vehicles', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.then(function(res){
			console.log(res.data);
			deferred.resolve(res.data);

		})
		.catch(function (err){
			console.log('err');
		});
		return deferred.promise;

	};
	
	/*First dropdown*/
	this.showVehicles=function(id){
		var deferred=$q.defer();
		$http.get('/api/v1/vehicles?category_id=' + id).then(function (res){
			console.log(res.data.length)
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	/*Show vehicle in second dropdown*/
	/*show dd*/
	/*will show vehicles categories*/
	
	this.showDefaultVehiclesInDropdown=function(id){
		var deferred=$q.defer();
		var offset;
		var query;
		$http.get('/api/v1/default_vehicle/throughcategory/'+id).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
 /*Service to get bank info by id*/
 	this.getBankInfo=function(id){
		var deferred=$q.defer();
		console.log(id);
		$http.get('/api/v1/users/'+id).then(function(res){
			deferred.resolve(res.data);

		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;

	};
	 /*Service to get personal by id*/
 	this.getPersonalInfo=function(id){
		var deferred=$q.defer();
		console.log(id);
		$http.get('/api/v1/users/'+id).then(function(res){
			deferred.resolve(res.data);

		}).catch(function (err){
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


	//service to fetch listing of vehicles
	this.getVehicleInfo=function(offset){
		var deferred=$q.defer();
		$http.get('/api/v1/vehicles?offset='+offset).then(function (res){
			deferred.resolve(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;



	};
	/*service to delete vehicle information*/
	this.deleteVehicleInfo=function(id){

		var deferred=$q.defer();
		$http.delete('/api/v1/vehicles/'+id).then(function(res){
			deferred.resolve(res.data);
			console.log(res.data);
		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};

	/*
	Service to get the vehicle data by id.
	*/
	this.getDataOfVehicleById=function(id){
		var deferred=$q.defer();
		console.log(id);
		$http.get('/api/v1/vehicles/'+id).then(function(res){
			deferred.resolve(res.data);

		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;

	};

	/*
	Service to upload documents for vehicles and driver
	*/
	this.saveDocuments=function(data){
		console.log(data.id);
		console.log('data before appending to fd in service is :',data);
		var deferred=$q.defer();
		var fd = new FormData();
		fd.append("document", data.document);
		if(data.cattype =='vehicle'){
			fd.append("vehicle",data.id);
		}else{
			fd.append("driver",data.id);
		}
		fd.append("type",data.type);
		console.log('fd is',fd);
		$http.post('/api/v1/documents', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.then(function(res){
			console.log(res.data);
			deferred.resolve(res.data);

		})
		.catch(function (err){
			console.log('err');
		});
		return deferred.promise;
	};
	/*
	service to get all documents
	*/
	this.getDocuments=function(type, id){
		console.log('gte doocssss service',id,type);
		var deferred=$q.defer();

		$http.get('/api/v1/documents?' + type + '=' +id).then(function(res){
			deferred.resolve(res.data);

		}).catch(function (err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};


	/*Service to delete the documents*/
	this.deleteDocuments=function(id){
		var deferred=$q.defer();
		$http.delete('/api/v1/documents/'+id).then(function(res){
			deferred.resolve(res.data);
			console.log(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;
	};
	
	/*Updatew Vehicel*/
	/*
	date:16feb
	Service:updateVehicleInfo
	Service params: files ,data
	Service info:To update the vehicle information of operator.
	*/
	this.updateVehicleInfo=function(id,pdata){

		var deferred=$q.defer();
		var fd = new FormData();
		if(pdata.images)
		{
			fd.append("images", pdata.images);
		}
		fd.append("registration_number",pdata.registration_number);
		fd.append("category",pdata.category);
		if(pdata.rc){
			fd.append("rc", pdata.rc);
		}
		if(pdata.permit){
			fd.append("permit", pdata.permit);
		}
		fd.append("type",pdata.type);
		angular.forEach(pdata.features,function(value,key){
			if(value != "")
			fd.append("features["+key+"]",value);
		});
		fd.append("capacity", pdata.capacity);
		fd.append("cost_per_km",pdata.cost_per_km);
		console.log('fd', fd)
		$http.put('/api/v1/vehicles/'+id, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.then(function(res){
			console.log(res.data);
			deferred.resolve(res.data);

		})
		.catch(function (err){
			console.log('err');
		});
		return deferred.promise;

	};

	/*Update Notification Setting*/
	/*
	date:20May
	Service:updateNotificationSetting
	Service params: files ,data
	Service info:To update the vehicle information of operator.
	*/
	this.updateNotificationSetting=function(id,pdata){
		var passData = {};
		passData.email_notification = pdata.email_notification;
		passData.sms = pdata.sms;
		passData.push_notification = pdata.push_notification;
		var deferred=$q.defer();
		$http.post('/api/v1/users/'+ id +'/updateNotificationSetting', passData, {
			// transformRequest: angular.identity,
			// headers: {'Content-Type': undefined}
		})
		.then(function(res){
			console.log(res.data);
			deferred.resolve(res.data);

		})
		.catch(function (err){
			console.log('err');
		});
		return deferred.promise;

	};

	/*Service to save bank information*/
	this.saveBankInfo=function(bankdetails,id){
		console.log('the data and id in service is',bankdetails,id);
		var deferred=$q.defer();
		var fd = new FormData();
		if(bankdetails.cheque){
		  console.log('the bankdetails.cheque',bankdetails.cheque);
          fd.append("cheque", bankdetails.cheque);
		}
		fd.append("branch_address",bankdetails.branch_address);
		fd.append("bank_branch",bankdetails.bank_branch);
		fd.append("bank_name",bankdetails.bank_name);
		fd.append("ifsc_code",bankdetails.ifsc_code);
		fd.append("account_number",bankdetails.account_number);
		fd.append("account_name",bankdetails.account_name);
		console.log('the fd is',fd);
        $http.put('/api/v1/users/'+id+'/bank_info',fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(function(res){
			deferred.resolve(res.data);
			console.log(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;

	};
	     /*To save Personal Info*/
	     /*To Save Personal Info of operator*/
        this.savePersonalInfo=function(personaldetails,id){
        console.log('The details are',personaldetails,id);
        var deferred=$q.defer();
        var fj = new FormData();
        // fj.append("id_proof", 'TEST');
      //  console.log('first fd',fj);
      if(personaldetails.id_proof){
        fj.append("id_proof", personaldetails.id_proof);
         }
          if(personaldetails.id_proof_company){
             fj.append("id_proof_company", personaldetails.id_proof_company);
             }
        console.log('personal details.home_location',JSON.stringify(personaldetails.home_location));
        fj.append("home_location",JSON.stringify(personaldetails.home_location));
        fj.append("cancellation_policy",personaldetails.cancellation_policy);
        fj.append("manager_contactno1",personaldetails.manager_contactno1);
        fj.append("manager_contactno2",personaldetails.manager_contactno2);
        fj.append("manager_name1",personaldetails.manager_name1);
        fj.append("manager_name2",personaldetails.manager_name2);
        fj.append("owner_name",personaldetails.owner_name);
        fj.append("operating_location",JSON.stringify(personaldetails.operating_location));
        fj.append("owner_phone_number",personaldetails.owner_phone_number);
        fj.append("pan_number",JSON.stringify(personaldetails.pan_number));
        fj.append("service_tax_number",JSON.stringify(personaldetails.service_tax_number));
        fj.append("vendor_address",personaldetails.vendor_address);
        fj.append("vendor_city",personaldetails.vendor_city);
        fj.append("working_hours",personaldetails.working_hours);
        fj.append("website",personaldetails.website);
        console.log('the fj is',fj);
        $http.put('/api/v1/users/'+id+'/personal_profileinfo',fj, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(res){
            deferred.resolve(res.data);
            console.log(res.data);
        }).catch(function(err){
            deferred.reject(JSON.parse(err.headers('api-meta')));
        });
        return deferred.promise;
};

		
	/*Get cities*/
	this.getCityList=function(){
    var deferred=$q.defer();
	$http.get('/api/v1/city').then(function (res){
     deferred.resolve(res.data);
	}).catch(function (err){
		deferred.reject(JSON.parse(err.headers('api-meta')));
	});
	return deferred.promise;
 };


	/*Service to save personal information*/
	/*this.savePersonalInfo=function(personaldetails,id){

		console.log('the data and id in service is',personaldetails,id);
		var deferred=$q.defer();
        $http.put('/api/v1/users/'+id+'/personal_profileinfo',personaldetails).then(function(res){
			deferred.resolve(res.data);
			console.log(res.data);
		}).catch(function(err){
			deferred.reject(JSON.parse(err.headers('api-meta')));
		});
		return deferred.promise;

	};

*/
}]).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
