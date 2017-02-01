/* global jest, describe, beforeEach, it, expect */
/* eslint no-unused-vars: 0 */

jest.autoMockOff();

describe('Reducer', () => {
    var Reducer;

    class InvalidReducer {
        getName() {
            return 'invalid';
        }

        apply(state, action) {
            throw 'WUUT!';
        }
    }

    beforeEach(() => {
        Reducer = require('../Reducer.js');
    });

    it('should not have default', () => {
        expect(Reducer.default).not.toBeDefined();
    });

    it('should have Reducer class', () => {
        expect(Reducer.Reducer).toBeDefined();
    });

    it('should have ReducerWrapper class', () => {
        expect(Reducer.ReducerWrapper).toBeDefined();
    });

    it('should have SimpleReducer class', () => {
        expect(Reducer.SimpleReducer).toBeDefined();
    });

    it('should have ReduxStoreBuilder class', () => {
        expect(Reducer.ReduxStoreBuilder).toBeDefined();
    });

    describe('Reducer', () => {
        describe('.getName', () => {
            it('should throw error if name not specified', () => {
                function create() {
                    new Reducer.Reducer();
                }

                expect(create).toThrowError('Name is required!');
            });

            it('should return the name on construction', () => {
                expect(new Reducer.Reducer('foo').getName()).toBe('foo');
                expect(new Reducer.Reducer('bar').getName()).toBe('bar');
            });
        });

        describe('.apply', () => {
            var r;

            beforeEach(() => {
                r = new Reducer.Reducer('foo');
            });

            it('should return the state back by default', () => {
                expect(r.apply({a: 2})).toEqual({a: 2});
                expect(r.apply({a: 3})).toEqual({a: 3});
            });

            it('should return empty object when no state', () => {
                expect(r.apply()).toEqual({});
            });
        });
    });

    describe('SimpleReducer', () => {
        var SimpleReducer;

        beforeEach(() => {
            SimpleReducer = Reducer.SimpleReducer;
        });

        it('should throw error if method is not specified', () => {
            function create() {
                new SimpleReducer('foo');
            }

            expect(create).toThrowError();
        });

        it('should throw error if method is not a function', () => {
            function create() {
                new SimpleReducer('foo', {});
            }

            expect(create).toThrowError();
        });

        describe('.apply', () => {
            it('should call the method on construction with apply params', () => {
                var f = jest.fn(state => state);
                var r = new SimpleReducer('foo', f);

                expect(r.apply({a: 2}, {type: 'test'})).toEqual({a: 2});
                expect(f.mock.calls.length).toBe(1);
                expect(f.mock.calls[0][0]).toEqual({a: 2});
                expect(f.mock.calls[0][1]).toEqual({type: 'test'});
            });

            it('should return the methods response', () => {
                var state = new SimpleReducer('foo', state => state);
                var action = new SimpleReducer('foo', (state,action) => action);

                expect(state.apply({a: 2}, {type: 'test'})).toEqual({a: 2});
                expect(action.apply({a: 2}, {type: 'test'})).toEqual({type: 'test'});
            });
        });
    });

    describe('ReducerWrapper', () => {
        var ReducerWrapper;

        beforeEach(() => {
            ReducerWrapper = Reducer.ReducerWrapper;
        });

        it('should call the method if specified on the actino type', () => {
            class TestReducer extends Reducer.Reducer {
                constructor() {
                    super('foo');
                }

                ADD_TODO(state, action) {
                    return {called: 'ADD_TODO'};
                }

                UPDATE_TODO(state, action) {
                    return {called: 'UPDATE_TODO'};
                }

                apply(state, action) {
                    return {called: 'APPLY'};
                }
            }

            let reducer = new ReducerWrapper(new TestReducer());

            expect(reducer.apply({}, {type: 'ADD_TODO'})).toEqual({called: 'ADD_TODO'});
            expect(reducer.apply({}, {type: 'UPDATE_TODO'})).toEqual({called: 'UPDATE_TODO'});
            expect(reducer.apply({}, {type: 'REMOVE_TODO'})).toEqual({called: 'APPLY'});
        });
    });

    describe('ReduxStoreBuilder', () => {
        var builder;

        beforeEach(() => {
            builder = new Reducer.ReduxStoreBuilder();
        });

        describe('.reducer', () => {
            it('should work with empty list of reducers', () => {
                var out = builder.reducer();

                expect(out).toBeDefined();
                expect(typeof out).toBe('function');
            });
        });

        describe('.withReducer', () => {
            it('should throw error when invalid reducer is supplied', () => {
                function addInvalidReducer() {
                    builder.withReducer(new InvalidReducer());
                }

                expect(addInvalidReducer).toThrowError('Invalid reducer!');
            });

            it('should throw error when reducer name is already in use', () => {
                function register() {
                    builder.withReducerMethod('foo', state => state);
                }

                expect(register).not.toThrow();
                expect(register).toThrow();
            });
        });

        describe('overall', () => {
            it('should build with all options specified', () => {
                var store = builder
                    .withLoggerOptions({
                        diff: true,
                        logger: {log: () => {}}
                    })
                    .withReducerMethod('foo', (state = {}, action) => {
                        if(action && action.type === 'hello') {
                            return {foo: 'bar'};
                        } else {
                            return state;
                        }
                    })
                    .withReducerMethods({
                        bar: () => { return {bar: 'foo'}; },
                        test: (state = {count: 1}) => { return {count: state.count + 1}; }
                    })
                    .withInitialState({foo: {foo: 'not bar'}})
                    .build();

                expect(store.getState()).toEqual({
                    foo: {foo: 'not bar'},
                    bar: {bar: 'foo'},
                    test: {count: 2}
                });

                store.dispatch({type: 'hello'});

                expect(store.getState()).toEqual({
                    foo: {foo: 'bar'},
                    bar: {bar: 'foo'},
                    test: {count: 3}
                });
            });
        });
    });
});
