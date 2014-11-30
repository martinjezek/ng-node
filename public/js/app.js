'use strict';

(function(){

    var app = angular.module('myapp', [
      'ngRoute',
      'myapp-home',
      'myapp-users'
    ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.jade',
                controller: 'HomeController',
                controllerAs: 'home'
            }).when('/users', {
                templateUrl: '/partials/users.jade',
                controller: 'UsersController',
                controllerAs: 'users'
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
                    },
                    {
                        name: 'Users',
                        url: '/users'
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
