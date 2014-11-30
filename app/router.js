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

    // App Version
    app.use(function(req, res, next) {
        if (!req.session.app) {
            var pkg = require('../package.json');
            req.session.app = {
                version: pkg.version
            };
        }
        next();
    });

    // Add Session to Jade templates
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

    // App routes
    app.use('/', require('../routes/index'));

    // 404 page
    app.use(function(req, res){
        res.status(404).render('404');
    });
};
