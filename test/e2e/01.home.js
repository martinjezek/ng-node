'use strict';

describe('home', function() {
    it('should have the Greetings', function() {
        browser.get('http://127.0.0.1:3000/');
        expect(element(by.tagName('h1')).getText()).toEqual('Marketing stuff!');
    });
});
