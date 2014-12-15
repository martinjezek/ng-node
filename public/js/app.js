'use strict';

(function(){

    var dependencies = [
        'ngRoute',
        'app.home',
        'app.users',
        'app.groups'
    ];

    var app = angular.module('app', dependencies);

    app.config(['$routeProvider', function ($routeProvider) {

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
            }).when('/groups/:groupId', {
                templateUrl: '/partials/group-detail.jade',
                controller: 'GroupDetailController'
            });

    }]);

    app.constant('config', {
        api: {
            url: 'http://127.0.0.1:8080'
        }
    });

    app.directive('navigation', function () {
        return {
            restrict: 'E',
            templateUrl: '/partials/navigation.jade',
            controller: function ($location) {

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

    app.directive('editableField', function ($compile, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '/partials/editable-field.jade',
            scope: {
                value: '=value'
            },
            link: function ($scope, element, attrs) {
                var input = element.find('input')[0],
                    defaultValue = null;

                // apply a form validator and the re-compile function
                if (attrs.required || attrs.ngPattern) {
                    // required
                    if (attrs.required) {
                        angular.element(input).attr('required', true);
                    }
                    // regexp pattern
                    if (attrs.ngPattern) {
                        $scope[attrs.ngPattern] = $scope.$parent[attrs.ngPattern];
                        angular.element(input).attr('ng-pattern', attrs.ngPattern);
                    }
                    $compile(element.contents())($scope);
                }

                // preset global and local active status
                $scope.$parent.activeEditableField = false;
                $scope.active = false;

                $scope.click = function () {
                    // allow only one active instance
                    if (!$scope.$parent.activeEditableField) {
                        // activate global and local status
                        $scope.$parent.activeEditableField = true;
                        $scope.active = true;
                        // get a default value and focus the input
                        defaultValue = $scope.value;
                        $timeout(function() {
                            input.focus();
                        });
                    }
                };

                $scope.blur = function () {
                    if (angular.element(input).hasClass('ng-invalid')) {
                        input.focus();
                    } else {
                        // deactivate global and local status
                        $scope.$parent.activeEditableField = false;
                        $scope.active = false;
                        // return a change status, if hasn't been returned before with truthy status
                        if (!$scope.$parent.changeEditableField) {
                            $scope.$parent.changeEditableField = defaultValue !== $scope.value;
                        }
                    }
                };
            }
        };
    });

})();
