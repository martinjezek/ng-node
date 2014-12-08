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

})();
