/* global require, module */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('lodash'),
    Immutable = require('immutable'),
    Store = require('./Store.js'),
    AppConstants = require('../constants/AppConstants.js'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js');

var state = Immutable.fromJS({
    route: {
        action: null,
        params: null,
        path: null,
        pathname: null,
        query: null
    },
    size: {
        width: null,
        height: null,
        visibility: null
    }
});

/**
 * Store for the app values.
 *
 * @class AppStore
 */

var AppStore = (function (_Store) {
    _inherits(AppStore, _Store);

    /*jshint unused:false*/

    /**
     * @method initialize
     */

    function AppStore() {
        _classCallCheck(this, AppStore);

        _get(Object.getPrototypeOf(AppStore.prototype), 'constructor', this).call(this);

        this.bindDispatcher(AppDispatcher, this.appDispatcherListener);
    }

    _createClass(AppStore, [{
        key: 'appDispatcherListener',

        /**
         * @method appDispatcherListener
         */
        value: function appDispatcherListener(event) {
            switch (event.source) {
                case AppConstants.ROUTE_ACTION:
                    state = state.mergeDeep({ route: {
                            action: event.action.action,
                            params: event.action.params,
                            path: event.action.path,
                            pathname: event.action.pathname,
                            query: event.action.query
                        } });

                    this.emitChange('route');
                    break;
                case AppConstants.WINDOW_RESIZE_ACTION:
                    state = state.mergeDeep({
                        size: {
                            width: event.action.width,
                            height: event.action.height,
                            visibility: event.action.visibility
                        }
                    });

                    this.emitChange('size');
                    break;
            }
        }
    }, {
        key: 'getState',

        /**
         * @method getState
         */
        value: function getState() {
            return state;
        }
    }]);

    return AppStore;
})(Store);

module.exports = new AppStore();