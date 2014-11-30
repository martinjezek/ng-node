'use strict';

(function(){

    var app = angular.module('myapp-groups', []);

    var GroupsController = function(config, $http) {
        var self = this;

        this.list = [];
        this.loading = true;

        $http.get(config.api.url + '/group').success(function(res) {
            self.list = res;
            self.loading = false;
        });
    };

    app.controller('GroupsController', GroupsController);

})();
