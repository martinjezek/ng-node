'use strict';

(function(){

    var app = angular.module('myapp-users', []);

    var UsersController = function(config, $http) {
        var self = this;

        this.list = [];

        $http.get(config.api.url + '/user').success(function(res) {
            self.list = res;
        });
    };

    app.controller('UsersController', UsersController);

})();
