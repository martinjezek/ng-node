'use strict';

(function(){

    var dependencies = [
        'angular.bs.modal'
    ];

    var app = angular.module('app.groups', dependencies);

    var GroupsController = function(config, $scope, $http, modal) {

        $scope.groups = [];

        // fetch groups
        $scope.fetchGroups = function () {
            $scope.loading = true;
            $http.get(config.api.url + '/group').success(function(res) {
                $scope.groups = res;
                $scope.loading = false;
            });
        };
        $scope.fetchGroups();

        // create group
        $scope.createGroup = function () {
            modal.open({
                scope: $scope,
                templateUrl: '/modal-create-group.html',
                controller: 'CreateGroupController'
            });
        };

        // remove group
        $scope.removeGroup = function (group) {
            $scope.remove = group;
            modal.open({
                scope: $scope,
                templateUrl: '/modal-remove-group.html',
                controller: 'RemoveGroupController'
            });
        };

    };

    var CreateGroupController = function (config, $scope, $http, modalInstance) {
        $scope.group = {};

        $scope.submit = function () {
            $http.post(config.api.url + '/group', $scope.group).success(function() {
                $scope.fetchGroups();
                modalInstance.close();
            });
        };
    };

    var RemoveGroupController = function (config, $scope, $http, modalInstance) {
        $scope.submit = function () {
            $http.delete(config.api.url + '/group/' + $scope.remove._id).success(function() {
                $scope.remove = null;
                $scope.fetchGroups();
                modalInstance.close();
            });
        };
    };

    app.controller('GroupsController', GroupsController);
    app.controller('CreateGroupController', CreateGroupController);
    app.controller('RemoveGroupController', RemoveGroupController);

    // Detail

    var GroupDetailController = function (config, $scope, $routeParams, $http, modal) {
        $scope.group = {};

        // fetch detail
        $scope.fetchGroup = function () {
            $scope.loading = true;
            $http.get(config.api.url + '/group/' + $routeParams.groupId + '?populate=users').success(function(res) {
                $scope.group = res;
                $scope.loading = false;
            });
        };
        $scope.fetchGroup();

        // save group changes
        $scope.saveChanges = function () {
            var changes = {
                name: $scope.group.name
            };
            $scope.loading = true;
            $http.put(config.api.url + '/group/' + $routeParams.groupId, changes).success(function() {
                $scope.loading = false;
                $scope.changeEditableField = false;
                $scope.fetchGroup();
            });
        };

        // assign user
        $scope.assignUser = function () {
            modal.open({
                scope: $scope,
                templateUrl: '/modal-assign-user.html',
                controller: 'AssignUserController'
            });
        };

        // unassign user
        $scope.unassignUser = function (user) {
            $scope.unassign = user;
            modal.open({
                scope: $scope,
                templateUrl: '/modal-unassign-user.html',
                controller: 'UnassignUserController'
            });
        };
    };

    var AssignUserController = function (config, $scope, $http, modalInstance, $routeParams) {
        $scope.user = null;

        $scope.users = [];
        $http.get(config.api.url + '/user').success(function (res) {
            $scope.users = res;
            $scope.user = res[0]; // ng-hack -> to select the first item
        });

        $scope.submit = function () {
            $http.post(config.api.url + '/group/' + $routeParams.groupId + '/user/' + $scope.user._id).success(function() {
                $scope.fetchGroup();
                modalInstance.close();
            });
        };
    };

    var UnassignUserController = function (config, $scope, $http, modalInstance, $routeParams) {
        $scope.submit = function () {
            $http.delete(config.api.url + '/group/' + $routeParams.groupId + '/user/' + $scope.unassign._id).success(function() {
                $scope.unassign = null;
                $scope.fetchGroup();
                modalInstance.close();
            });
        };
    };

    app.controller('GroupDetailController', GroupDetailController);
    app.controller('AssignUserController', AssignUserController);
    app.controller('UnassignUserController', UnassignUserController);

})();
