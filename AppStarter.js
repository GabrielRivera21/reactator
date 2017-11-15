/* global require, document */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var React = require('react'),
    ReactDOM = require('react-dom'),
    BrowserRouter = require('react-router-dom').BrowserRouter,
    HashRouter = require('react-router-dom').HashRouter,
    AppDispatcher = require('./dispatcher/AppDispatcher.js'),
    MetaDataComponent = require('./components/MetaDataComponent.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

/**
 * AppStarter helping to configure and start the app
 *
 * @class  AppStarter
 */

var AppStarter = (function () {

    /**
     * @method constructor
     */

    function AppStarter() {
        _classCallCheck(this, AppStarter);

        this.routes = undefined;
        this.hash = false;
    }

    _createClass(AppStarter, [{
        key: 'withHash',

        /**
         * Sets the hash setting, true to use hash, false to use html5 history
         *
         * @param {Boolean} useHash to use or not to use
         * @return {AppStarter} the app starter
         * @method withHash
         * @deprecated
         */
        value: function withHash(useHash) {
            this.hash = useHash;
            return this;
        }
    }, {
        key: 'withRoutes',

        /**
         * Sets the routes to start the app with
         *
         * @param {Router} routes routes to start the app with
         * @return {AppStarter} the app starter
         * @method withRoutes
         * @deprecated
         */
        value: function withRoutes(routes) {
            this.routes = routes;
            return this;
        }
    }, {
        key: 'start',

        /**
         * Starts the app
         *
         * @method start
         */
        value: function start() {
            // The MetaData Component providing common functionality / support.
            ReactDOM.render(React.createElement(MetaDataComponent, null), document.getElementById('_md'));

            this.routes.initialize();
            if(this.hash === true) {
                ReactDOM.render(
                    React.createElement(HashRouter, null, this.routes.getRoutes()), 
                    document.getElementById('main')
                );
            } else {
                ReactDOM.render(
                    React.createElement(BrowserRouter, null, this.routes.getRoutes()), 
                    document.getElementById('main')
                );
            }
        }
    }]);

    return AppStarter;
})();

module.exports = new AppStarter();