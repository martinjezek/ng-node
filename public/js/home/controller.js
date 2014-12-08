'use strict';

(function(){

    var dependencies = [];

    var app = angular.module('app.home', dependencies);

    var HomeController = function() {
        this.boxes = [
            {
                title: 'Latest',
                description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.',
                link: '/#/'
            },
            {
                title: 'Features',
                description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.',
                link: '/#/'
            },
            {
                title: 'Help',
                description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.',
                link: '/#/'
            }
        ];
    };

    app.controller('HomeController', HomeController);

})();
