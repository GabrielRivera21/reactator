/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    CompositeRoutes = require('reactator/routes/CompositeRoutes'),
    MainRoutes = require("./MainRoutes.js"),
    ProfileRoutes = require('./ProfileRoutes.js'),
    AppLayout = require("../components/AppLayout");

/**
 * @class DemoRoutes
 */
class DemoRoutes extends CompositeRoutes {
    constructor() {
        super([
                new MainRoutes(),
                new ProfileRoutes()
            ]);
    }

    getRoutes() {
        return (
                <Route handler={AppLayout}>
                    {super.getRoutes()}
                </Route>
            );
    }
}

module.exports = DemoRoutes;
