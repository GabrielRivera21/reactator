/* global require, document */
//import { Router, Route, Link, browserHistory } from 'react-router'
//
const
    React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    AppDispatcher = require('./dispatcher/AppDispatcher.js'),
    MetaDataComponent = require('./components/MetaDataComponent.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

var app = undefined;

class App extends React.Component {
    render() {
        app = this;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

/**
 * AppStarter helping to configure and start the app
 *
 * @class  AppStarter
 */
class AppStarter {

    /**
     * @constructor
     */
    constructor() {
        this.routes = undefined;
        this.history = Router.browserHistory;
    }

    /**
     * Sets the hash setting, true to use hash, false to use html5 history
     *
     * @param {Boolean} history to use or not to use
     * @return {AppStarter} the app starter
     * @method withHistory
     */
    withHistory(history) {
        this.history = history;
        return this;
    }

    /**
     * Sets the routes to start the app with
     *
     * @param {Router} routes routes to start the app with
     * @return {AppStarter} the app starter
     * @method withRoutes
     */
    withRoutes(routes) {
        this.routes = routes;
        return this;
    }

    onUpdate() {
        AppDispatcher.handleRouteAction({
            action: app.props.location.action,
            pathname: app.props.location.pathname,
            params: app.props.location.query
        });
    }

    /**
     * Starts the app
     *
     * @method start
     * @returns {undefined}
     */
    start() {
        // The MetaData Component providing common functionality / support.
        ReactDOM.render(
            <MetaDataComponent />,
            document.getElementById('_md')
        );

        this.routes.initialize();
        ReactDOM.render(
            <Router history={ReactRouter.browserHistory} onUpdate={this.onUpdate}>
                <Route component={App}>
                    {this.routes.getRoutes()}
                </Route>
            </Router>,
            document.getElementById('main')
        );
    }
}

module.exports = new AppStarter();
