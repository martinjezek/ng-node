'use strict';

(function(){

    var app = angular.module('myapp-users', []);

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

    };

    var CreateUserController = function (config, $scope, $http, modalInstance) {
        $scope.user = {};
        $scope.onlyNumbers = /^\d+$/;

        $scope.save = function () {
            $http.post(config.api.url + '/user', $scope.user).success(function() {
                $scope.fetchUsers();
                modalInstance.close();
            });
        };
    };

    app.controller('UsersController', UsersController);
    app.controller('CreateUserController', CreateUserController);

})();
