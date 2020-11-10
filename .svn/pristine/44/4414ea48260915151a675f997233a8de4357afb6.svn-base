angular.module('app.coupon.services', [])
        .service('CouponService', ['$http', '$q', function($http, $q) {
                /* Fetching all coupons data */
                this.getCouponsList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/coupons?offset=' + offset + '&code=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular coupon data based on id */
                this.getCoupon = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/coupons/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Add new coupon */
                this.addNewCoupon = function(coupon) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/coupons/', coupon).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(JSON.parse(err.headers('api-meta')));
                    });
                    return deffered.promise;
                };

                this.statusUpdateCoupon = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/coupons/statusUpdate', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

                /* Delete particular coupon data based on id */
                this.deleteCoupon = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/coupons/delete', ids).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            }]);