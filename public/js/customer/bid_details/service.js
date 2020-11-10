angular
.module('app.customer.biddetails.service', [])
.service('BidDetailsService',['$http', '$q', function($http, $q){

                /*Service is used to post inventories*/
                this.postInventories = function(data){
                    console.log("Post it");
                    var deffered = $q.defer();
                     $http.post('api/v1/inventories', data).then(function(res){
                     deffered.resolve(res.data);
                     }).catch(function(err){
                     deffered.reject(JSON.parse(err.headers('api-meta')));
                     });
                     return deffered.promise;
                     };


}]);
