angular
        .module('app.chat.service', ['app.factory.socket','app.env'])
//loginservice for login user
        .service('ChatService', ['$http', '$q', function($http, $q) {

                this.sendMsg = function(data) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/chat/', data).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };


            }]);
