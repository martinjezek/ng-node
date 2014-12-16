'use strict';

describe('groups', function() {
    it('should add a new group', function() {
        browser.get('/#/groups');

        var groups     = element.all(by.repeater('group in groups')),
            createGroup = element(by.css('[ng-click="createGroup()"]'));

        createGroup.click();
        browser.sleep(500);

        var group = {
            name : element(by.model('group.name'))
        };

        var submit = element(by.css('[name="formCreateGroup"] [type="submit"]'));
        group.name.sendKeys('Protractor Group');
        submit.click();

        group = {
            name : groups.last().element(by.binding('group.name'))
        };

        expect(group.name.getText()).toBe('Protractor Group');
    });

    it('should remove the new group', function() {
        browser.get('/#/groups');

        var groups     = element.all(by.repeater('group in groups')),
            group      = {
                name   : groups.last().element(by.binding('group.name'))
            },
            removeGroup = groups.last().element(by.css('[ng-click="removeGroup(group)"]'));

        expect(group.name.getText()).toBe('Protractor Group');

        removeGroup.click();
        browser.sleep(500);

        var submit = element(by.css('[name="formRemoveGroup"] [type="submit"]'));
        submit.click();

        group = {
            name : groups.last().element(by.binding('group.name'))
        };

        expect(group.name.getText()).not.toBe('Protractor Group');
    });
});
