'use strict';

(function(){

    var app = angular.module('myapp', [
      'ngRoute',
      'myapp-home'
    ]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.jade',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

})();
