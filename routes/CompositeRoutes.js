/* global module, require */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('lodash'),
    Routes = require('./Routes.js');

/**
 * See {{#crossLink "Routes"}}{{/crossLink}}
 *
 * @class CompositeRoutes
 */

var CompositeRoutes = (function (_Routes) {
    _inherits(CompositeRoutes, _Routes);

    /**
     * @param {Array} routes array of routes
     * @method constructor
     */

    function CompositeRoutes(routes) {
        _classCallCheck(this, CompositeRoutes);

        _get(Object.getPrototypeOf(CompositeRoutes.prototype), 'constructor', this).call(this);

        this.routes = routes;
    }

    _createClass(CompositeRoutes, [{
        key: 'initialize',

        /**
         * Initializes all routes
         *
         * @method initialize
         */
        value: function initialize() {
            _.map(this.routes, function (r) {
                return r.initialize();
            });
        }
    }, {
        key: 'getRoutes',

        /**
         * Returns array of routes
         *
         * @method getRoutes
         */
        value: function getRoutes() {
            return _.map(this.routes, function (r) {
                return r.getRoutes();
            });
        }
    }]);

    return CompositeRoutes;
})(Routes);

module.exports = CompositeRoutes;