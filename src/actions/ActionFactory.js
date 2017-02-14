import _ from '../lib/lodash.js';

/**
 * @class
 * @memberOf module:Reactator
 */
export default class ActionFactory {
    /**
     * @method create
     *
     * @param {String} name - name
     * @param {Object} params - params
     *
     * @return {Array} array of actions
     */
    create(name, params) { /* eslint no-unused-vars: 0 */
        return [];
    }
}

/**
 * @class
 * @memberOf module:Reactator
 * @extends {module:Reactator.ActionFactory}
 *
 * @param {function} factoryMethod - method to create ActionFactory for
 *
 * @see module:Reactator.ActionFactory
 */
export class SimpleActionFactory  extends ActionFactory {
    constructor(factoryMethod) {
        super();
        this.factoryMethod = factoryMethod;
    }

    create(name, params) {
        return this.factoryMethod(name, params);
    }
}

/**
 * @class
 * @memberOf module:Reactator
 * @extends {module:Reactator.ActionFactory}
 *
 * @param {Array} actions - list of actions the factory creates for
 *
 * @see module:Reactator.ActionFactory
 */
export class FilteredActionFactory extends ActionFactory {
    constructor(actions, method) {
        super();
        this.actions = actions;
        this.method = method;
    }

    create(name, params) {
        if (_.includes(this.actions, name)) {
            return this.method(name, params);
        } else {
            return [];
        }
    }
}

/**
 * @namespace ReactatorActionFactoryHelpers
 * @classdesc ReactatorActionFactoryHelpers
 * @memberOf module:Reactator
 */

/**
 * @method module:Reactator.ReactatorActionFactoryHelpers#asActionFactory
 *
 * @param {module:Reactator.ActionFactory|function} obj - actionFactory or function
 * @return {module:Reactator.ActionFactory} action factory
 */
export function asActionFactory(obj) {
    if (obj instanceof ActionFactory) {
        return obj;
    }

    _.check(_.isFunction(obj));
    return new SimpleActionFactory(obj);
}
