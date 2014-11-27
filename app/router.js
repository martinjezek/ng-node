'use strict';

var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon');

module.exports = function(app) {

    // Favicon
    app.use(favicon(path.join(process.cwd(), '/public/favicon.ico')));

    // Public files
    app.use(express.static(path.join(process.cwd(), '/public')));

    // App routes
    app.use('/', require('../routes/index'));

    // 404 page
    app.use(function(req, res){
        res.status(404).render('404');
    });
};
