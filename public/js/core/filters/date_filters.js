angular.module('app.core.filters.date', [])
.filter( 'time', function() {
return function( input ) { 
       return moment(input).format('LT');
}
})
.filter( 'day', function() {
return function( input ) {
       return moment(input).format('DD MMM');
}
})
.filter( 'dates', function() {
return function( input ) {
       return moment(input).format('DD MMM YYYY');
}
})
.filter( 'date_time', function() {
return function( input ) {
       return moment(input).add(2, 'hours').format('DD MMM, LT');
}
}).filter( 'bid_date_time', function() {
return function( input ) {
       return moment(input).utc().format('MMMM Do YYYY, h:mm:ss a');
}
});
