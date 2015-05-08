/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    BasicLayout = require("../../../components/common/BasicLayout.js"),
    ProfileComponent = require("../components/profile/ProfileComponent.js");

/**
 * React Router definition for profile app
 *
 * @class RoutesProfile
 */
const routes = (
    <Route name="profile" handler={BasicLayout}>
        <DefaultRoute handler={ProfileComponent} />
    </Route>
);

module.exports = routes;
