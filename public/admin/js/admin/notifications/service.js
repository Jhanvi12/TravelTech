angular.module('app.notification.services', [])
        .service('NotificationService', ['$http', '$q', function($http, $q) {
                /* Fetching all notifications data */
                this.getNotificationsList = function(offset, status, query) {
                    var deffered = $q.defer();
                    var path = "";
                    // if (status) {
                    //     console.log("in status");
                    //     var path = '/api/v1/notifications?all=true&status=' + status + '&all=true&offset=' + offset;
                    // } 
                    // else if (query) {
                       
                    //     var path = '/api/v1/notifications?all=true&offset=' + offset + '&name=' + query;
                    //      console.log("in query");
                    // } else {
                    //     var path = '/api/v1/notifications?all=true&offset=' + offset;
                    // }
                    console.log('status', status)
                    console.log('query', query)
                    if (status) {
                        console.log("in status",status);
                        var path = '/api/v1/notifications?all=true&status=' + status + '&all=true&offset=' + offset;
                    } 
                    else{
                   var path = '/api/v1/notifications?all=true&offset=' + offset + '&name=' + query;
    
                    }
                    $http.get(path).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular notification data based on id */
                this.getNotification = function(id) {
                    console.log("id",id);
                    var deffered = $q.defer();
                    $http.get('/api/v1/notifications/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Add new notification */
                this.addNewNotification = function(notify) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/notifications/', notify).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.statusUpdateNotification = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/notifications/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                /* Delete particular notification data based on id */
                this.deleteNotification = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/notifications/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            }]);