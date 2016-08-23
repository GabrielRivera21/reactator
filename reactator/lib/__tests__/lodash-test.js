/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('lodash', function() {

    var _;

    beforeEach(function() {
        _ = require('../lodash.js');
    });

    it('should not throw exception when defined', function() {

        var obj = 'foo';

        var pass = () => {
            _.checkDefined(obj);
        };

        expect(pass).not.toThrow();
    });

    it('should throw exception when not defined', function() {

        var obj1;
        var obj2 = null;
        var obj3 = void 0;

        var failUndefined = () => {
            _.checkDefined(obj1);
        };

        var failNull = () => {
            _.checkDefined(obj2);
        };


        var fail0 = () => {
            _.checkDefined(obj3);
        };

        expect(failUndefined).toThrow();
        expect(failNull).toThrow();
        expect(fail0).toThrow();
    });

});
