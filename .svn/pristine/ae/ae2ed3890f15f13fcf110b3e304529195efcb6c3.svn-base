angular.module('app.core.filters.chat', [])
        .filter('dateFromNow', function() {
            return function(input) {
                return moment(input).fromNow();
            }
        })
        .filter('time', function() {
            return function(input) {
                return moment(input).format('h:mm:ss a');
            }
        })
        .filter('day', function() {
            return function(input) {
                return moment(input).format('dddd DD MMMM YYYY');
            }
        })
        .filter('dayTime', function() {
            return function(input) {
                return moment(input).format('dddd DD MMMM YYYY, h:mm a');
            }
        });
