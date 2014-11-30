'use strict';

(function(){

    var app = angular.module('myapp', [
      'ngRoute',
      'myapp-home'
    ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.jade',
                controller: 'HomeController',
                controllerAs: 'home'
            });

    }]);

    app.directive('navigation', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/navigation.jade',
            controller: function($location) {

                this.items = [
                    {
                        name: 'Home',
                        url: '/'
                    }
                ];

                this.isActive = function(url) {
                    return url === $location.path();
                };

            },
            controllerAs: 'navigation'
        };
    });

})();
