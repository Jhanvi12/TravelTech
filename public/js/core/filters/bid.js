angular.module('app.core.filters.bid', [])
        .filter('bidstatus', function() {
            return function(input) {
                if (input == 1) {
                    return "Pending";
                } else if (input == 2) {
                    return "Approved";
                } else if (input == 3) {
                    return "Canceled";
                } else {
                    return "NA";
                }
            }
        });
