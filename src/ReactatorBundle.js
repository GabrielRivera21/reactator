/**
 * @class
 * @memberOf module:Reactator
 * @classdesc ReactatorBundle defining all the modules and reducers to be installed as a bundle
 *
 * @param {Array} reducers - list of reducers for the bundle
 * @param {Array} modules - list of modules for the bundle
 *
 *
 * @see module:Reactator.Reducer
 * @see module:Reactator.ReactatorModule
 */
export default class ReactatorBundle {
    constructor(reducers, modules) {
        this.reducers = reducers;
        this.modules = modules;
    }
}
