import ReactatorBundle from '../ReactatorBundle.js';
import ResponsiveModule from '../modules/ResponsiveModule.js';
import ResponsiveReducer from '../reducers/ResponsiveReducer.js';

// TEST:

/**
 * @class
 * @classdesc The responsive bundle installed for every app
 * @memberOf module:Reactator
 * @see module:Reactator.ReactatorApp
 * @see module:Reactator.ResponsiveModule
 * @see module:Reactator.ResponsiveReducer
 */
export default class ResponsiveBundle extends ReactatorBundle {
    constructor() {
        super([
            new ResponsiveReducer()
        ], [
            new ResponsiveModule()
        ]);
    }
}
