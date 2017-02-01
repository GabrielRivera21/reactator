/* global jest, describe, beforeEach, afterEach, it, expect, fail */

jest.autoMockOff();
jest.useRealTimers();

var LOGGER = require('loglevel');
var _ = require('../../lib/lodash.js');
var ReactatorModuleCollection = require('../ReactatorModule.js');
var ReactatorModule = ReactatorModuleCollection.ReactatorModule;
var Context = ReactatorModuleCollection.Context;
var CompositeModule = ReactatorModuleCollection.CompositeModule;
var SerialCompositeModule = ReactatorModuleCollection.SerialCompositeModule;
var CompositeModuleBuilder = ReactatorModuleCollection.CompositeModuleBuilder;

var Promise = require('bluebird');

LOGGER.disableAll();

class OrderedModule extends ReactatorModule {
    constructor(name, order) {
        super(name);
        this.order = order;
    }

    pushName() {
        if (!_.isNil(this.order)) {
            this.order.push(this.name);
        }
    }
}

class DelayModule extends OrderedModule {
    constructor(name, delay, v, order) {
        super(name, order);

        this.delay = delay;
        this.v = v;
    }

    postpone(promise) {
        return promise.delay(this.delay)
            .then((v) => {
                this.pushName();
                return v;
            });
    }

    initialize() {
        return this.postpone(Promise.resolve(this.v));
    }

    getComponents() {
        return this.postpone(Promise.resolve([this.v]));
    }

    willStart() {
        return this.postpone(Promise.resolve(this.v));
    }

    didStart() {
        return this.postpone(Promise.resolve(this.v));
    }
}

class TestModule extends OrderedModule {
    constructor(name, v, order) {
        super(name, order);
        this.v = v;
    }

    initialize() {
        this.pushName();
        return this.v;
    }

    getComponents() {
        this.pushName();
        return [this.v];
    }

    willStart() {
        this.pushName();
        return this.v;
    }

    didStart() {
        this.pushName();
        return this.v;
    }
}

class FailModule extends OrderedModule {
    constructor(name, order) {
        super(name, order);
    }

    initialize() {
        this.pushName();
        throw Error('Fail initialize');
    }

    getComponents() {
        this.pushName();
        throw Error('Fail getComponents');
    }

    willStart() {
        this.pushName();
        throw Error('Fail willStart');
    }

    didStart() {
        this.pushName();
        throw Error('Fail didStart');
    }
}

describe('ReactatorModule', function() {

    var module;

    beforeEach(function() {
        module = new ReactatorModule('foo');
    });

    afterEach(function() {
        jest.runAllTicks();
    });

    it('should return null on all methods', function() {
        expect(module.name).toBe('foo');
        expect(function() { module.setContext(new Context()); }).not.toThrow();
        expect(module.initialize()).toBe(null);
        expect(module.getComponents()).toEqual([]);
        expect(module.willStart()).toBe(null);
        expect(module.didStart()).toBe(null);
    });

    it('should throw exception on no name', function() {
        expect(() => { new ReactatorModule(); }).toThrow();
    });
});

describe('SerialCompositeModule', function() {
    var order;
    var builder;

    beforeEach(function() {
        order = [];
        builder = new CompositeModuleBuilder().withSerialModule(true);
    });

    it('should run in order', function() {
        var module = builder
            .withModule(new DelayModule('bar1', 10, 1234, order))
            .withModule(new TestModule('bar2', 4567, order))
            .withModule(new DelayModule('bar3', 10, 890, order))
            .withModule(new TestModule('bar4', 123, order))
            .build();

        return module.initialize()
            .then((result) => {
                expect(order[0]).toEqual('bar1');
                expect(order[1]).toEqual('bar2');
                expect(order[2]).toEqual('bar3');
                expect(order[3]).toEqual('bar4');

                expect(result.bar1).toEqual(1234);
                expect(result.bar2).toEqual(4567);
                expect(result.bar3).toEqual(890);
                expect(result.bar4).toEqual(123);
            });
    });

    it('should fail if any fails', function() {
        var module = builder
            .withModule(new DelayModule('bar1', 10, 1234, order))
            .withModule(new TestModule('bar2', 4567, order))
            .withModule(new FailModule('bar3', order))
            .withModule(new TestModule('bar4', 123, order))
            .build();

        return module.initialize()
            .then(() => {
                fail();
            }).catch(() => {
                expect(_.size(order)).toEqual(3);
                expect(order[0]).toEqual('bar1');
                expect(order[1]).toEqual('bar2');
                expect(order[2]).toEqual('bar3');
                return null;
            });
    });

    it('should pass when used reflect', function() {
        var module = builder
            .withModule(new DelayModule('bar1', 10, 1234, order))
            .withModule(new TestModule('bar2', 4567, order))
            .withModule(new FailModule('bar3', order))
            .withModule(new TestModule('bar4', 123, order))
            .build();

        return module.didStart()
            .then((result) => {
                expect(order[0]).toEqual('bar1');
                expect(order[1]).toEqual('bar2');
                expect(order[2]).toEqual('bar3');
                expect(order[3]).toEqual('bar4');


                expect(result.bar1.isFulfilled()).toBe(true);
                expect(result.bar1.value()).toBe(1234);
                expect(result.bar2.isFulfilled()).toBe(true);
                expect(result.bar2.value()).toBe(4567);
                expect(result.bar3.isFulfilled()).toBe(false);
                expect(result.bar4.isFulfilled()).toBe(true);
                expect(result.bar4.value()).toBe(123);
            });
    });
});

describe('CompositeModuleBuilder', function() {
    var builder;

    beforeEach(function() {
        builder = new CompositeModuleBuilder();
    });

    afterEach(function() {
        jest.runAllTicks();
    });

    it('should process in parallel', function() {
        var order = [];
        var module = builder
            .withModule(new DelayModule('bar1', 30, 1234, order))
            .withModule(new TestModule('bar2', 4567, order))
            .withModule(new DelayModule('bar3', 20, 890, order))
            .withModule(new DelayModule('bar4', 10, 123, order))
            .build();

        return module.initialize()
            .then((result) => {
                expect(order[0]).toEqual('bar2');
                expect(order[1]).toEqual('bar4');
                expect(order[2]).toEqual('bar3');
                expect(order[3]).toEqual('bar1');

                expect(result.bar1).toEqual(1234);
                expect(result.bar2).toEqual(4567);
                expect(result.bar3).toEqual(890);
                expect(result.bar4).toEqual(123);
            });
    });

    it('should create CompositeModule if not specified serialized', function() {
        var module = builder
            .withModule(new TestModule('bar1', 1234))
            .withModule(new TestModule('bar2', 4567))
            .build();

        expect(module instanceof CompositeModule).toEqual(true);
        expect(module instanceof SerialCompositeModule).toEqual(false);

        return module.initialize()
            .then((result) => {
                expect(result.bar1).toBe(1234);
                expect(result.bar2).toBe(4567);
            });
    });

    it('should create SerialCompositeModule if specified serialized', function() {
        var module = builder
            .withModule(new TestModule('bar1', 1234))
            .withModule(new TestModule('bar2', 4567))
            .withSerialModule(true)
            .build();

        expect(module instanceof CompositeModule).toEqual(true);
        expect(module instanceof SerialCompositeModule).toEqual(true);

        return module.initialize()
            .then((result) => {
                expect(result.bar1).toBe(1234);
                expect(result.bar2).toBe(4567);
            });
    });

});

describe('CompositeModule', function() {
    var module;

    afterEach(function() {
        jest.runAllTicks();
    });

    it('initialize should wait for all', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new TestModule('bar2', 4567)
            ]);

            return module.initialize();
        }).then((result) => {
            expect(result.bar1).toBe(1234);
            expect(result.bar2).toBe(4567);
        });
    });

    it('initialize should fail if any of them fail', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new FailModule('bar2')
            ]);

            return module.initialize();
        }).then(() => {
            fail();
        }).catch(() => {
            return null;
        });
    });

    it('should setContext for all modules', function() {
        module = new CompositeModule([
            new TestModule('bar1', 1234),
            new TestModule('bar2', 1234),
        ]);

        var c = new Context();

        module.setContext(c);

        _.map(module.modules, function(module) {
            expect(module.context).toBe(c);
        });
    });

    describe('timeout', function() {
        it('initialize should succeed and wait for timeout at minimum', function() {
            return Promise.try(() => {
                module = new CompositeModule([new DelayModule('bar1', 10, 1234), new DelayModule('bar2', 50, 4567)], 100);
                return module.initialize();
            }).then((result) => {
                expect(result.bar1).toBe(1234);
                expect(result.bar2).toBe(4567);
            });
        });

        it('initialize should fail if timeout occures', function() {
            return Promise.try(() => {
                module = new CompositeModule([new DelayModule('bar1', 50, 1234), new DelayModule('bar2', 10, 4567)], 30);
                return module.initialize();
            }).then(() => {
                fail();
            }).catch(() => {
                return null;
            });
        });
    });


    it('getComponents should wait for all', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new TestModule('bar2', 4567)
            ]);

            return module.getComponents();
        }).then((result) => {
            expect(result.bar1).toEqual([1234]);
            expect(result.bar2).toEqual([4567]);

            var values = _.flatten(_.values(result));

            expect(_.size(values)).toBe(2);
            expect(_.includes(values, 1234)).toBe(true);
            expect(_.includes(values, 4567)).toBe(true);
        });
    });

    it('getComponents should fail if any of them fail', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new FailModule('bar2')
            ]);

            return module.getComponents();
        }).then(() => {
            fail();
        }).catch(() => {
            return null;
        });
    });


    it('willStart should wait for all', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new TestModule('bar2', 4567)
            ]);

            return module.willStart();
        }).then((result) => {
            expect(result.bar1).toBe(1234);
            expect(result.bar2).toBe(4567);
        });
    });

    it('willStart should fail if any of them fail', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new FailModule('bar2')
            ]);

            return module.willStart();
        }).then(() => {
            fail();
        }).catch(() => {
            return null;
        });
    });

    it('didStart should wait for all', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new TestModule('bar2', 4567)
            ]);

            return module.didStart();
        }).then((result) => {
            expect(result.bar1.isFulfilled()).toBe(true);
            expect(result.bar1.value()).toBe(1234);

            expect(result.bar2.isFulfilled()).toBe(true);
            expect(result.bar2.value()).toBe(4567);
        });
    });

    it('didStart should NOT fail if any of them fail', function() {
        return Promise.try(() => {
            module = new CompositeModule([
                new TestModule('bar1', 1234),
                new FailModule('bar2')
            ]);

            return module.didStart();
        }).then((result) => {
            expect(result.bar1.isFulfilled()).toBe(true);
            expect(result.bar1.value()).toBe(1234);

            expect(result.bar2.isFulfilled()).toBe(false);

            var reason = result.bar2.reason();

            expect(reason instanceof Error).toBe(true);
            expect(reason.message).toBe('Fail didStart');

        });
    });
});
