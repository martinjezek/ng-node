'use strict';

var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon');

module.exports = function(app) {
    var publicFolder = path.join(process.cwd(), '/public');

    // Favicon
    app.use(favicon(publicFolder + '/favicon.ico'));

    // AngularJS Jade templates
    app.get('/partials/:name', function(req, res){
        res.render(publicFolder + '/partials/' + req.params.name);
    });

    // Public files
    app.use(express.static(publicFolder));

    // App routes
    app.use('/', require('../routes/index'));

    // 404 page
    app.use(function(req, res){
        res.status(404).render('404');
    });
};
