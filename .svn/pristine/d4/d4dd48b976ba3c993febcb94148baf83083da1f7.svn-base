angular
    .module('app.operator.notifications.service', [])
    //service to handle notification section
    //19 may 16
    .service('NotificationoperatorService', ['$http', '$q', function($http, $q) {
     // used to get notification list
        this.getNotifications = function(id,status,query) {
            var deferred = $q.defer();
            var path = "";

            if (status) {
           console.log("in status");
           var path =  '/api/v1/notifications/reciever/' + id +'?status='+status; 
        } 
        else{
            console.log("in else")
            var path = '/api/v1/notifications/reciever/' + id;
          }
    
            $http.get(path).then(function(res) {
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
        }
         this.getNotificationForHeader = function(id){
             var deffered = $q.defer();
            var path =  '/api/v1/notifications/reciever/' + id ; 
            $http.get(path).then(function(res) {
                deffered.resolve(res.data);
            }).catch(function(err) {
                deffered.reject(err);
            });
            return deffered.promise;
        }

    }]);
