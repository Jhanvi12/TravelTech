'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../../components/auth.js');

// Routes for Watchlist Api
router
.get('/', require('./all')) 
// .get('/:id', require('./get')) // route for getting bid by id
// .get('/:type/:id', require('./all')) // route for getting bid based on ride
 .delete('/:id', require('./delete')) // route for delete bid by id
// .put('/:id', require('./put')) // route for update bid by id
.post('/', require('./post')); 

module.exports = router;
