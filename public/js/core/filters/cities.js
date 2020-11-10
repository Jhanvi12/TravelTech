angular.module('app.core.filters.cities', [])
.filter( 'cities_count', function() {
return function( input ) {
    var distinct = _.uniq(input);
       return distinct.length;
}
});
