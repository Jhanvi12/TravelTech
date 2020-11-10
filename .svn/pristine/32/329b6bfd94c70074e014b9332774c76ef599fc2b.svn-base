'use strict';
var config = require('config');
/*
  Primary Route Loader
  It will load all the child routes by nested module approach
*/
  module.exports = function(app){

    //* GET home page. */
  	app.get('/', function(req, res, next) {
 	 	res.render('index', { title: 'TravelTech' });
  	});
    app.get('/admin', function(req, res, next) {
    res.render('/admin/index', { title: 'TravelTech' });
    });
   /* Route for Api */
    app.use('/api', require('./v1'));
};
