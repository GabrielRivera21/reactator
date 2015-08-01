/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Routes = require('reactator/routes/Routes'),
    BasicLayout = require("reactator/components/BasicLayout"),
    ProfileComponent = require("../components/profile/ProfileComponent");

/**
 * React Router definition for profile app
 *
 * @class ProfileRoutes
 */
class ProfileRoutes extends Routes {
    getRoutes() {
        return (
                <Route key="profile" name="profile" handler={BasicLayout}>
                    <DefaultRoute handler={ProfileComponent} />
                </Route>
            );
    }
}

module.exports = ProfileRoutes;
