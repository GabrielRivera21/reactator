import _ from 'lodash';
import Routes from './Routes.js';

/**
 * See {{#crossLink "Routes"}}{{/crossLink}}
 *
 * @class CompositeRoutes
 * @memberof module:Reactator
 */
class CompositeRoutes extends Routes {

    /**
     * @param {Array} routes array of routes
     * @constructor
     */
    constructor(routes) {
        super();

        this.routes = routes;
    }

    /**
     * Initializes all routes
     *
     * @return {undefined}
     */
    initialize() {
        _.map(this.routes, (r) => r.initialize());
    }

    /**
     * Returns array of routes
     *
     * @return {Array} array of the routes
     */
    getRoutes() {
        return _.map(this.routes, (r) => r.getRoutes());
    }
}

module.exports = CompositeRoutes;
