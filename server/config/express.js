/**
 * Express configuration
 */

'use strict';
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('config');
var morgan = require('morgan');
var _ = require('lodash');
var path = require('path');

module.exports = function(app) {
    app.use(cors());
    app.use(morgan(':method :url :response-time'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use('/public', express.static('public'));
    app.use(express.static(path.join(__dirname, '../../public')));
    // view engine setup
    app.set('views', path.join(__dirname, '../../public'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

};
