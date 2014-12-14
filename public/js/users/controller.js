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

    var UserDetailController = function (config, $scope, $routeParams, $http) {
        $scope.user = {};
        $scope.onlyNumbers = /^\d+$/;

        // fetch detail
        $scope.fetchUser = function () {
            $scope.loading = true;
            $http.get(config.api.url + '/user/' + $routeParams.userId).success(function(res) {
                $scope.user = res;
                $scope.loading = false;
            });
        };
        $scope.fetchUser();

        // save user changes
        $scope.saveChanges = function () {
            console.log('save', $scope.user);
            $scope.changeEditableField = false;
        };

    };

    app.controller('UserDetailController', UserDetailController);

})();
