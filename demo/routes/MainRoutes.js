/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    IndexRoute = Router.IndexRoute,
    Routes = require('reactator/routes/Routes'),
    BasicLayout = require('reactator/components/BasicLayout'),
    MainComponent = require('../components/main/MainComponent');

/**
 * React Router definition for main app
 *
 * @class MainRoutes
 */
class MainRoutes extends Routes {
    getRoutes() {
        return (
                <Route key="main" name="main" path="/" component={BasicLayout}>
                    <IndexRoute component={MainComponent} />
                </Route>
            );
    }
}

module.exports = MainRoutes;
