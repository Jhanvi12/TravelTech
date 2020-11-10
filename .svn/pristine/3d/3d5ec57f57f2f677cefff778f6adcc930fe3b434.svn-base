angular.module('app.inventories.services', [])
        .service('InventoryService', ['$http', '$q', function($http, $q) {

                /* Fetching all inventories list */
                this.getInventoryList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/inventories?offset=' + offset + '&guest_name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

               /* deleteing inventories list */
              this.deleteInventory = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/inventories/deleteall', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            
            }]);