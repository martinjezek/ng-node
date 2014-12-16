'use strict';

exports.config = {
    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: [
        './e2e/*.js'
    ],

    baseUrl: 'http://127.0.0.1:3000/',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
