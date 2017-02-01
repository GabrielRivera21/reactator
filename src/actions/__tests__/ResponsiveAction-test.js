/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('ResponsiveAction', function() {
    var ResponsiveAction;

    beforeEach(function() {
        ResponsiveAction = require('../ResponsiveAction.js');
    });

    // TEST: Write better tests

    it('FOFOFOFOFOFOFOFOFO', function() {
        var action = ResponsiveAction.setResponsiveViewAction('FOO');

        expect(action.type).toBe('SET_RESPONSIVE_VIEW');
        expect(action.payload).toBe('FOO');
    });
});
