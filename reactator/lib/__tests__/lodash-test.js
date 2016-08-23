/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('lodash', function() {

    var _;

    beforeEach(function() {
        _ = require('../lodash.js');
    });


    describe('_.checkDefined', function() {
        it('should not throw exception when defined', function() {

            var obj = 'foo';

            var pass = () => {
                expect(_.checkDefined(obj)).toBe(obj);
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

    describe('_.checkNotDefined', function() {

        it('should throw exception when defined', function() {

            var obj = 'foo';

            var pass = () => {
                _.checkNotDefined(obj);
            };

            expect(pass).toThrow();
        });

        it('should not throw exception when not defined', function() {

            var obj1;
            var obj2 = null;
            var obj3 = void 0;

            var failUndefined = () => {
                _.checkNotDefined(obj1);
            };

            var failNull = () => {
                _.checkNotDefined(obj2);
            };


            var fail0 = () => {
                _.checkNotDefined(obj3);
            };

            expect(failUndefined).not.toThrow();
            expect(failNull).not.toThrow();
            expect(fail0).not.toThrow();
        });
    });

});



