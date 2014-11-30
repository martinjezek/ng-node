'use strict';

(function(){

    var app = angular.module('myapp-users', []);

    var UsersController = function(config, $http) {
        var self = this;

        this.list = [];
        this.loading = true;

        $http.get(config.api.url + '/user').success(function(res) {
            self.list = res;
            self.loading = false;
        });
    };

    app.controller('UsersController', UsersController);

})();
