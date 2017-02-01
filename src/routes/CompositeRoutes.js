import _ from '../lib/lodash.js';
import Routes from './Routes.js';

// TEST:

/**
 * @class
 * @classdesc the composite view of routes
 * @extends {module:Reactator.Routes}
 * @memberOf module:Reactator
 *
 * @param {Array} routes array of routes
 */
class CompositeRoutes extends Routes {
    constructor(routes) {
        super();

        /** @member {Array} */
        this.routes = routes;
    }

    /**
     * @method module:Reactator.CompositeRoutes#initialize
     * @override
     * @description Initializes all routes
     *
     * @return {undefined}
     */
    initialize() {
        _.map(this.routes, (r) => r.initialize());
    }

    /**
     * @method module:Reactator.CompositeRoutes#getRoutes
     * @override
     * @description Returns array of routes
     *
     * @return {Array} array of the routes
     */
    getRoutes() {
        return _.map(this.routes, (r) => r.getRoutes());
    }
}

module.exports = CompositeRoutes;
