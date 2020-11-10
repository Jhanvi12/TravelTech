angular.module('app.core.filters.ride', [])
        .filter('ridetype', function() {
            return function(input) {
                if (input == 1) {
                    return "One Way";
                } else if (input == 2) {
                    return "Multi Way";
                } else if (input == 3) {
                    return "Airport Dropoff";
                } else if (input == 4) {
                    return "Airport Pickup";
                } else if (input == 5) {
                    return "Local";
                } else if (input == 6) {
                    return "Return Trip";
                } else {
                    return "NA";
                }
            }
        })

        .filter('ridestatus', function() {
            return function(input) {
                if (input == 1) {
                    return "Open";
                } else if (input == 2) {
                    return "Upcoming";
                } else if (input == 3) {
                    return "Completed";
                } else if (input == 4) {
                    return "Cancelled";
                } else {
                    return "NA";
                }
            }
        });
