'use strict';

var app = angular.module('app', [
  'ngRoute',
  'appControllers'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.jade',
                controller: 'Home'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
