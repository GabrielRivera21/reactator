/* global module, require */

const
    _ = require('lodash'),
    Routes = require('./Routes.js');

/**
 * See {{#crossLink "Routes"}}{{/crossLink}}
 *
 * @class CompositeRoutes
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
     * @method initialize
     * @returns {undefined}
     */
    initialize() {
        _.map(this.routes, (r) => r.initialize());
    }

    /**
     * Returns array of routes
     *
     * @method getRoutes
     * @returns {Array} array of the routes
     */
    getRoutes() {
        return _.map(this.routes, (r) => r.getRoutes());
    }
}

module.exports = CompositeRoutes;
