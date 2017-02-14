import ReactatorBundle from './ReactatorBundle.js';

/**
 * @class
 * @memberOf module:Reactator
 * @extends {module:Reactator.ReactatorBundle}
 * @classdesc ReactatorServerBundle defining all the modules and reducers to be installed as a bundle & actionFactories
 *
 * @param {Array} reducers - list of reducers for the bundle
 * @param {Array} modules - list of modules for the bundle
 * @param {Array} actionFactories - actionFactories for the server bundle
 *
 * @see module:Reactator.Reducer
 * @see module:Reactator.ReactatorModule
 * @see module:Reactator.ActionFactory
 */
export default class ReactatorServerBundle extends ReactatorBundle {
    constructor(reducers, modules, actionFactories) {
        super(reducers, modules);

        /** @member {Object} */
        this.actionFactories = actionFactories;
    }
}
