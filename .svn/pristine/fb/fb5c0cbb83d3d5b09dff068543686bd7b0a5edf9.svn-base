angular.module('app.review.services', [])
        .service('ReviewService', ['$http', '$q', function($http, $q) {
                /* Fetching all reviews data */
                this.getReviewsList = function(offset, query) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/feedback?offset=' + offset + '&name=' + query).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Fetching particular review data based on id */
                this.getReview = function(id) {
                    var deffered = $q.defer();
                    $http.get('/api/v1/feedback/' + id).then(function(res) {
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                };

                /* Delete particular review data based on id */
                this.deleteReview = function(ids) {
                    var deffered = $q.defer();
                    $http.post('/api/v1/feedback/delete', ids).then(function(res) {
                        console.log(res.data)
                        deffered.resolve(res.data);
                    }).catch(function(err) {
                        deffered.reject(err);
                    });
                    return deffered.promise;
                }

            }]);