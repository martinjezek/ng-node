'use strict';

(function(){

    var app = angular.module('myapp', [
      'ngRoute',
      'myapp-home'
    ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider) {

        // application router
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

                // array of navigation's items
                this.items = [
                    {
                        name: 'Home',
                        url: '/'
                    }
                ];

                // check if the current item is active
                this.isActive = function(url) {
                    return url === $location.path();
                };

            },
            controllerAs: 'navigation'
        };
    });

})();
