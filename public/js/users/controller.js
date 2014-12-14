'use strict';

(function(){

    var dependencies = [
        'angular.bs.modal'
    ];

    var app = angular.module('app.users', dependencies);

    var UsersController = function (config, $scope, $http, modal) {

        $scope.users = [];

        // fetch users
        $scope.fetchUsers = function () {
            $scope.loading = true;
            $http.get(config.api.url + '/user').success(function(res) {
                $scope.users = res;
                $scope.loading = false;
            });
        };
        $scope.fetchUsers();

        // create user
        $scope.createUser = function () {
            modal.open({
                scope: $scope,
                templateUrl: '/modal-create-user.html',
                controller: 'CreateUserController'
            });
        };

        // remove user
        $scope.removeUser = function (user) {
            $scope.remove = user;
            modal.open({
                scope: $scope,
                templateUrl: '/modal-remove-user.html',
                controller: 'RemoveUserController'
            });
        };

    };

    var CreateUserController = function (config, $scope, $http, modalInstance) {
        $scope.user = {};
        $scope.onlyNumbers = /^\d+$/;

        $scope.submit = function () {
            $http.post(config.api.url + '/user', $scope.user).success(function() {
                $scope.fetchUsers();
                modalInstance.close();
            });
        };
    };

    var RemoveUserController = function (config, $scope, $http, modalInstance) {
        $scope.submit = function () {
            $http.delete(config.api.url + '/user/' + $scope.remove._id).success(function() {
                $scope.remove = null;
                $scope.fetchUsers();
                modalInstance.close();
            });
        };
    };

    app.controller('UsersController', UsersController);
    app.controller('CreateUserController', CreateUserController);
    app.controller('RemoveUserController', RemoveUserController);

    // Detail

    var UserDetailController = function (config, $scope, $routeParams, $http, modal) {
        $scope.user = {};
        $scope.onlyNumbers = /^\d+$/;

        // fetch detail
        $scope.fetchUser = function () {
            $scope.loading = true;
            $http.get(config.api.url + '/user/' + $routeParams.userId + '?populate=groups').success(function(res) {
                $scope.user = res;
                $scope.loading = false;
            });
        };
        $scope.fetchUser();

        // save user changes
        $scope.saveChanges = function () {
            var changes = {
                name: $scope.user.name,
                age: $scope.user.age
            };
            $scope.loading = true;
            $http.put(config.api.url + '/user/' + $routeParams.userId, changes).success(function() {
                $scope.fetchUser();
                $scope.changeEditableField = false;
                $scope.loading = false;
            });
        };

        // assign group
        $scope.assignGroup = function () {
            modal.open({
                scope: $scope,
                templateUrl: '/modal-assign-group.html',
                controller: 'AssignGroupController'
            });
        };

        // unassign group
        $scope.unassignGroup = function (group) {
            $scope.unassign = group;
            modal.open({
                scope: $scope,
                templateUrl: '/modal-unassign-group.html',
                controller: 'UnassignGroupController'
            });
        };
    };

    var AssignGroupController = function (config, $scope, $http, modalInstance, $routeParams) {
        $scope.group = null;

        $scope.groups = [];
        $http.get(config.api.url + '/group').success(function (res) {
            $scope.groups = res;
            $scope.group = res[0]; // ng-hack -> to select the first item
        });

        $scope.submit = function () {
            $http.post(config.api.url + '/group/' + $scope.group._id + '/user/' + $routeParams.userId).success(function() {
                $scope.fetchUser();
                modalInstance.close();
            });
        };
    };

    var UnassignGroupController = function (config, $scope, $http, modalInstance, $routeParams) {
        $scope.submit = function () {
            $http.delete(config.api.url + '/group/' + $scope.unassign._id + '/user/' + $routeParams.userId).success(function() {
                $scope.unassign = null;
                $scope.fetchUser();
                modalInstance.close();
            });
        };
    };

    app.controller('UserDetailController', UserDetailController);
    app.controller('AssignGroupController', AssignGroupController);
    app.controller('UnassignGroupController', UnassignGroupController);

})();
