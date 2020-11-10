angular
        .module('app.profile.service', [])
//loginservice for login user
        .service('ProfileService', ['$http', '$q', function($http, $q) {

                this.getProfile = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/users/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                // this.updateProfile = function(user) {        
                // 	var deffered = $q.defer();
                // 	$http.put('/api/v1/users/' + user._id, user).then(function(res) {
                // 		deffered.resolve(res.data);
                // 	}).catch(function(err) {
                // 		deffered.reject(err);
                // 	});
                // 	return deffered.promise;
                // };

                /*
                 Service to update the user information along with profile pic
                 */
                this.updateProfile = function(data) {
                    var deffered = $q.defer();
                    var fd = new FormData();
                    if (data.profile_pic) {
                        fd.append('profile_pic', data.profile_pic);
                    }
                    fd.append('first', data.name);
                    fd.append('email', data.email);
                    fd.append('phone_number', data.phone_number);
                    fd.append('job_title', data.job_title);
                    fd.append('department', data.department);
                    fd.append('street', data.address[0].street);
                    fd.append('city', data.address[0].city);
                    fd.append('state', data.address[0].state);
                    fd.append('zip', data.address[0].zip);
                    fd.append('is_active', data.is_active);
                    console.log(fd);
                    $http.put('/api/v1/users/profileUpdate/' + data._id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

            }]);
