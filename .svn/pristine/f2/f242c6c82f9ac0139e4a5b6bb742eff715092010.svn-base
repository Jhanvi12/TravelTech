angular.module('app.core.filters.vehicle', [])
.filter( 'vehicle_count', function() {
return function( input ) {
    var total_vehicle = 0;
      input.forEach(function(val){
         total_vehicle = total_vehicle + val.count;
      });
      return total_vehicle;
}
});
