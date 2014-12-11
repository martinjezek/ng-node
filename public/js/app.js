'use strict';

(function(){

    var dependencies = [
        'ngRoute',
        'app.home',
        'app.users',
        'app.groups'
    ];

    var app = angular.module('app', dependencies);

    app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.jade',
                controller: 'HomeController',
                controllerAs: 'home'
            }).when('/users', {
                templateUrl: '/partials/users.jade',
                controller: 'UsersController',
                controllerAs: 'users'
            }).when('/users/:userId', {
                templateUrl: '/partials/user-detail.jade',
                controller: 'UserDetailController'
            }).when('/groups', {
                templateUrl: '/partials/groups.jade',
                controller: 'GroupsController',
                controllerAs: 'groups'
            });

    }]);

    app.constant('config', {
        api: {
            url: 'http://127.0.0.1:8080'
        }
    });

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
                    },
                    {
                        name: 'Groups',
                        url: '/groups'
                    }
                ];

                this.isActive = function(url) {
                    if (url == '/') {
                        return url === $location.path();
                    } else {
                        return new RegExp('^' + url + '.?').test($location.path());
                    }
                };

            },
            controllerAs: 'navigation'
        };
    });

})();
