import _ from '../lib/lodash.js';
import LOGGER from 'loglevel';
import Promise from 'bluebird';
import moment from 'moment';

// TEST: Complete test coverage

/**
 * @class
 * @classdesc Context for the module
 * @memberOf module:Reactator
 *
 * @param {DOMNode} root - root
 * @param {ReduxStore} store - store
 */
export class Context {
    constructor(root, store) {
        /** @member {DOMNode} */
        this.root = root;

        /** @member {ReduxStore} */
        this.store = store;
    }
}

/**
 * @class
 * @classdesc module that could be installed with the app
 * @memberOf module:Reactator
 *
 * @param {String} name - name
 */
export class ReactatorModule {
    constructor(name) {
        this.name = _.checkDefined(name, 'name is required!');
        this.context = undefined;
    }

    /**
     * @method module:Reactator.ReactatorModule#setContext
     *
     * @param {Context} context - context for the module
     * @return {undefined}
     */
    setContext(context) {
        _.checkDefined(context);
        _.checkNotDefined(this.context);
        _.check(context instanceof Context, 'Invalid context!');

        this.context = context;
    }

    /**
     * @method module:Reactator.ReactatorModule#initialize
     *
     * @return {null} null
     */
    initialize() {
        return null;
    }

    /**
     * @method module:Reactator.ReactatorModule#getComponents
     *
     * @return {Array} array of components for the module
     */
    getComponents() {
        return [];
    }

    /**
     * @method module:Reactator.ReactatorModule#willStart
     *
     * @return {null} null
     */
    willStart() {
        return null;
    }

    /**
     * @method module:Reactator.ReactatorModule#didStart
     *
     * @return {null} null
     */
    didStart() {
        return null;
    }
}

const DEFAULT_TIMEOUT =  moment.duration('PT1M').asMilliseconds();

/**
 * @class
 * @classdesc composite module
 * @memberOf module:Reactator
 *
 * @param {Array} modules - modules
 * @param {Number} timeout - timeout in milliseconds
 */
export class CompositeModule {
    constructor(modules, timeout) {

        /** @member {Array} */
        this.modules = _.checkDefined(modules, 'Modules are required!');

        _.map(this.modules, (module) => {
            _.check(module instanceof ReactatorModule);
        });

        /** @member {Array} */
        this.names = _.map(this.modules, 'name');

        /** @member {Number} */
        this.timeout = timeout || DEFAULT_TIMEOUT;

        /** @member {Context} */
        this.context = undefined;
    }

    /**
     * @method module:Reactator.CompositeModule#setContext
     *
     * @param {Context} context - context
     * @return {undefined}
     */
    setContext(context) {
        _.checkDefined(context);
        this.context = context;

        _.map(this.modules, (module) => {
            module.setContext(context);
        });
    }

    /**
     * @method module:Reactator.CompositeModule#initialize
     *
     * @return {Promise} promise initializing all modules
     */
    initialize() {
        return this.process((module) => {
            return this.try('initialize', module.name, ::module.initialize);
        });
    }

    /**
     * @method module:Reactator.CompositeModule#getComponents
     *
     * @return {Promise} promise calling getComponents on all modules
     */
    getComponents() {
        return this.process((module) => {
            return this.try('getComponents', module.name, ::module.getComponents);
        });
    }

    /**
     * @method module:Reactator.CompositeModule#willStart
     *
     * @return {Promise} promise calling willStart on all modules
     */
    willStart() {
        return this.process((module) => {
            return this.try('willStart', module.name, ::module.willStart);
        });
    }

    /**
     * @method module:Reactator.CompositeModule#didStart
     *
     * @return {Promise} promise calling didStart on all modules
     */
    didStart() {
        return this.process((module) => {
            return this.try('didStart', module.name, ::module.didStart).reflect();
        });
    }

    try(action, name, method) {
        return Promise.try(() => {
            LOGGER.info(`Processing module ${name} for ${action}.`);
            return method();
        }).timeout(this.timeout)
        .then((value) => {
            LOGGER.info(`Processed module ${name} for ${action}.`);
            return value;
        }).catch(Promise.TimeoutError, (e) => {
            LOGGER.error(`Module ${name} timedout on ${action}`);
            throw e;
        }).catch((e) => {
            LOGGER.error(`Module ${name} failed on ${action}`, e);
            throw e;
        });
    }

    process(transformer) {
        return Promise.all(_.map(this.modules, transformer)).then(::this.mapByName);
    }

    mapByName(results) {
        return _.fromPairs(_.zip(this.names, results));
    }
}

/**
 * @class
 * @classdesc a composite module that serialy processes modules
 * @extends {module:Reactator.CompositeModule}
 * @memberOf module:Reactator
 */
export class SerialCompositeModule extends CompositeModule {
    constructor(modules, timeout) {
        super(modules, timeout);
    }

    process(transformer) {
        return Promise.reduce(this.modules, (aggregate, module) => {
            return transformer(module)
                .then((result) => {
                    aggregate.push(result);
                    return aggregate;
                });
        }, [])
        .then(::this.mapByName);
    }
}

/**
 * @class
 * @classdesc composite module builder
 * @memberOf module:Reactator
 */
export class CompositeModuleBuilder {
    constructor() {
        /** @member {Array} */
        this.modules = [];

        /** @member {Number} */
        this.timeout = undefined;

        /** @member {Class} */
        this.CompositeClass = CompositeModule;
    }

    /**
     * @method module:Reactator.CompositeModuleBuilder#withSerialModule
     *
     * @param {Boolean} enabled - serial or not
     *
     * @return {CompositeModuleBuilder} this builder
     */
    withSerialModule(enabled) {
        this.CompositeClass = enabled ? SerialCompositeModule : CompositeModule;
        return this;
    }

    /**
     * @method module:Reactator.CompositeModuleBuilder#withTimeout
     *
     * @param {Number} timeout - timeout for the composite module
     *
     * @return {CompositeModuleBuilder} this builder
     */
    withTimeout(timeout) {
        _.check(_.isNil(timeout) || _.isNumber(timeout), 'Timeout has to be a number.');
        this.timeout = timeout;
        return this;
    }

    /**
     * @method module:Reactator.CompositeModuleBuilder#withModule
     *
     * @param {ReactatorModule} module - module to add to the composite module
     *
     * @return {CompositeModuleBuilder} this builder
     */
    withModule(module) {
        _.check(module instanceof ReactatorModule, 'Module object has to be instance of ReactatorModule');
        this.modules.push(module);
        return this;
    }

    /**
     * @method module:Reactator.CompositeModuleBuilder#withModules
     *
     * @param {Array} modules - array of modules
     *
     * @return {CompositeModuleBuilder} this builder
     */
    withModules(modules) {
        _.check(_.isArray(modules), `Invalid type of '${typeof modules}' modules, expecting an array!`);

        _.map(modules, (module) => {
            this.withModule(module);
        });

        return this;
    }

    /**
     * @method module:Reactator.CompositeModuleBuilder#build
     *
     * @return {CompositeModule} composite module based on the current state of the builder
     */
    build() {
        return new this.CompositeClass(this.modules, this.timeout);
    }
}

/**
 * @namespace ReactatorModuleHelpers
 * @classdesc ReactatorModuleHelpers
 * @memberOf module:Reactator
 */

/**
 * @method module:Reactator.ReactatorModuleHelpers#getComponents
 *
 * @param {CompositeModule} module - module to start
 * @return {Promise} promise returning array of components order by name of the module
 */
export function getComponents(module) {
    return Promise.try(() => {
        return module.initialize();
    }).then(() => {
        return module.getComponents();
    }).then((components) => {
        return _.flattenDeep(_.map(_.orderBy(_.keys(components)), (k) => components[k]));
    });
}

/**
 * @method module:Reactator.ReactatorModuleHelpers#getComponents
 *
 * @param {CompositeModule} module - module to start
 * @param {module:Reactator.Context} context - context for the modules
 * @param {function} startCallback - startCallback method to be called for the start
 * @return {Promise} promise returning the exit status code
 */
export function start(module, context, startCallback) {
    let exitCode = 0;

    return getComponents(module)
        .then((components) => {
            return components;
        }).then((components) => {
            module.setContext(context);
            return components;
        }).then((components) => {
            return module.willStart()
                .return(components);
        }).catch((err) => {
            LOGGER.error('Module initialization failed!', err);
            LOGGER.info('Failed to initialize the modules, proceeding with empty components!');
            exitCode = 1;

            return [];
        }).then((components) => {
            return Promise.fromCallback((callback) => {
                startCallback(components, callback);
            });
        }).then(() => {
            return module.didStart();
        }).catch((err) => {
            LOGGER.error('Module start failed!', err);
            exitCode = 2;

            return {};
        }).return(exitCode);
}
