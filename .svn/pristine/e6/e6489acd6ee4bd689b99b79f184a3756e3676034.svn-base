angular
    .module('app.customer.notifications.service', [])
    //service to handle notification section
    //19 may 16
    .service('NotificationCustomerService', ['$http', '$q', function($http, $q) {

     // used to get notification list
        this.getNotifications = function(id) {
            var deferred = $q.defer();
            $http.get('/api/v1/notifications/reciever/' + id).then(function(res) {
                deferred.resolve(res.data);
            }).catch(function(err) {
                deferred.reject(JSON.parse(err.headers('api-meta')));
            });
            return deferred.promise;
        };

       // used to delete notification
        this.deleteNotification = function(ids) {
            var deffered = $q.defer();
            $http.post('/api/v1/notifications/delete', ids).then(function(res) {
                deffered.resolve(res.data);
            }).catch(function(err) {
                deffered.reject(err);
            });
            return deffered.promise;
        }

   // used to read notification
        this.statusUpdateNotification = function(ids) {
            var deffered = $q.defer();
            $http.post('/api/v1/notifications/statusUpdate', ids).then(function(res) {
                deffered.resolve(res.data);
            }).catch(function(err) {
                deffered.reject(err);
            });
            return deffered.promise;
        }

           this.sortingforStatus = function(id,status){
             var deffered = $q.defer();
            var path =  '/api/v1/notifications/reciever/' + id +'?status='+status; 
            $http.get(path).then(function(res) {
                deffered.resolve(res.data);
            }).catch(function(err) {
                deffered.reject(err);
            });
            return deffered.promise;
        };
        
    }]);
