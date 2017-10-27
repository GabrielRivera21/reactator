/* global require, module */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Client = require("./Client.js");

/**
 * Class wrapping the {{#crossLink "Client"}}{{/crossLink}}.
 *
 * @class ClientWrapper
 * @constructor
 */

var ClientWrapper = (function (_Client) {
    _inherits(ClientWrapper, _Client);

    /*jshint unused:false*/

    /**
     * @param {Client} client client to decorate
     * @method initialize
     */

    function ClientWrapper(client) {
        _classCallCheck(this, ClientWrapper);

        _get(Object.getPrototypeOf(ClientWrapper.prototype), "constructor", this).call(this);

        if (!(client instanceof Client)) {
            throw new Error("ClientWrapper can only wrap instance of the Client.");
        }

        this.client = client;
    }

    _createClass(ClientWrapper, [{
        key: "create",

        /**
         * {{#crossLink "Client/create:method"}}{{/crossLink}}
         * @method create
         */
        value: function create(item, settings) {
            return this.client.create(item, settings);
        }
    }, {
        key: "read",

        /**
         * {{#crossLink "Client/read:method"}}{{/crossLink}}
         * @method read
         */
        value: function read(id, settings) {
            return this.client.read(id, settings);
        }
    }, {
        key: "update",

        /**
         * {{#crossLink "Client/update:method"}}{{/crossLink}}
         * @method update
         */
        value: function update(id, item, settings) {
            return this.client.update(id, item, settings);
        }
    }, {
        key: "delete",

        /*jshint -W024 */
        /**
         * {{#crossLink "Client/delete:method"}}{{/crossLink}}
         * @method delete
         */
        value: function _delete(id, settings) {
            return this.client["delete"](id, settings);
        }
    }]);

    return ClientWrapper;
})(Client);

module.exports = ClientWrapper;