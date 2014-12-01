'use strict';

(function(){

    var app = angular.module('myapp-users', []);

    var UsersController = function (config, $http, $modal) {
        var self = this;

        // list users
        this.list = [];
        this.loading = true;

        $http.get(config.api.url + '/user').success(function(res) {
            self.list = res;
            self.loading = false;
        });

        // create user
        this.createUser = function () {
            var createModal = $modal.open({
                templateUrl: 'create-user.ng',
                controller: 'CreateUserController',
                controllerAs: 'modal',
                size: '',
                resolve: {
                items: function () {}
                }
            });

            createModal.result.then(function () {

            });
        };

    };

    var CreateUserController = function ($modalInstance, items) {
        this.save = function () {
            $modalInstance.close();
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    app.controller('UsersController', UsersController);
    app.controller('CreateUserController', CreateUserController);

})();
