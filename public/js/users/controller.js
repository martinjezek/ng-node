'use strict';

(function(){

    var app = angular.module('myapp-users', []);

    var UsersController = function() {
        this.list = [
            {
                '_id': '54452ca2b01967311ce6cc0e',
                'name': 'Michal',
                'age': 33,
                '__v': 0,
                'groups': []
            },
            {
                '_id': '54452cc8b01967311ce6cc0f',
                'name': 'Ales',
                'age': 30,
                '__v': 0,
                'groups': []
            },
            {
                '_id': '54452c95b01967311ce6cc0d',
                'name': 'Martin',
                'age': 27,
                '__v': 0,
                'groups': [
                    '54452c1eb01967311ce6cc0a'
                ]
            }
        ];
    };

    app.controller('UsersController', UsersController);

})();
