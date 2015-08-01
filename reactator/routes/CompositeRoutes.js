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
     * @method constructor
     */
    constructor(routes) {
        super();

        this.routes = routes;
    }

    /**
     * Initializes all routes
     *
     * @method initialize
     */
    initialize() {
        _.map(this.routes, (r) => r.initialize());
    }

    /**
     * Returns array of routes
     *
     * @method getRoutes
     */
    getRoutes() {
        return _.map(this.routes, (r) => r.getRoutes());
    }
}

module.exports = CompositeRoutes;