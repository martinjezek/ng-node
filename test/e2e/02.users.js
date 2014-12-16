'use strict';

describe('users', function() {
    it('should add a new user', function() {
        browser.get('/#/users');

        var users      = element.all(by.repeater('user in users')),
            createUser = element(by.css('[ng-click="createUser()"]'));

        createUser.click();
        browser.sleep(500);

        var user = {
            name : element(by.model('user.name')),
            age  : element(by.model('user.age'))
        };

        var submit = element(by.css('[name="formCreateUser"] [type="submit"]'));
        user.name.sendKeys('Protractor User');
        user.age.sendKeys('99');
        submit.click();

        user = {
            name : users.last().element(by.binding('user.name')),
            age  : users.last().element(by.binding('user.age'))
        };

        expect(user.name.getText()).toBe('Protractor User');
        expect(user.age.getText()).toBe('99');
    });

    it('should remove the new user', function() {
        browser.get('/#/users');

        var users      = element.all(by.repeater('user in users')),
            user       = {
                name   : users.last().element(by.binding('user.name')),
                age    : users.last().element(by.binding('user.age'))
            },
            removeUser = users.last().element(by.css('[ng-click="removeUser(user)"]'));

        expect(user.name.getText()).toBe('Protractor User');
        expect(user.age.getText()).toBe('99');

        removeUser.click();
        browser.sleep(500);

        var submit = element(by.css('[name="formRemoveUser"] [type="submit"]'));
        submit.click();

        user = {
            name : users.last().element(by.binding('user.name')),
            age  : users.last().element(by.binding('user.age'))
        };

        expect(user.name.getText()).not.toBe('Protractor User');
        expect(user.age.getText()).not.toBe('99');
    });
});
