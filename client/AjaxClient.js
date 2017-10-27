/* global require, module */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('lodash'),
    Q = require('../lib/q.js'),
    $ = require('../lib/jquery.js'),
    Client = require('./Client.js'),
    ClientError = require('./ClientError.js'),
    ClientResponse = require('./ClientResponse.js');

//
// Helper to return a Q.Promise that returns ClientResponse or ClientError for an
// ajax request.
//
var promise = function promise($ajax) {
    var getHeaders = function getHeaders() {
        var headers = {};
        _.map($ajax.getAllResponseHeaders().trim().split('\n'), function (header) {
            var index = header.indexOf(':');
            headers[header.substr(0, index).trim()] = header.substr(index + 1).trim();
        });

        return headers;
    };

    return Q.Promise(function (resolve, reject) {
        Q($ajax).then(function (response) {
            return resolve(new ClientResponse(response, $ajax.status, getHeaders()));
        })['catch'](function (error) {
            return reject(new ClientError(error.status, error.responseText, $ajax));
        }).done();
    });
};

//
// Helper for requesting the ajax and returning the promise
//
var ajax = function ajax(settings, request) {
    return promise($.ajax(_.extend({}, settings, request)));
};

/**
 * Class representing the implementation of the Client interface utilizing the jQuery's ajax.
 *
 * @class AjaxClient
 * @constructor
 */

var AjaxClient = (function (_Client) {
    _inherits(AjaxClient, _Client);

    /**
     * @param {String} uri uri to the resource
     * @method initialize
     */

    function AjaxClient(uri) {
        _classCallCheck(this, AjaxClient);

        _get(Object.getPrototypeOf(AjaxClient.prototype), 'constructor', this).call(this);

        this.uri = uri;
    }

    _createClass(AjaxClient, [{
        key: 'create',

        /**
         * {{#crossLink "Client/create:method"}}{{/crossLink}}
         * @method create
         */
        value: function create(item, settings) {
            return ajax(settings, {
                method: 'POST',
                url: this.uri,
                contentType: 'application/json',
                data: JSON.stringify(item),
                dataType: 'json'
            });
        }
    }, {
        key: 'read',

        /**
         * {{#crossLink "Client/read:method"}}{{/crossLink}}
         * @method read
         */
        value: function read(id, settings) {
            return ajax(settings, {
                method: 'GET',
                url: this.uri + '/' + id,
                dataType: 'json'
            });
        }
    }, {
        key: 'update',

        /**
         * {{#crossLink "Client/update:method"}}{{/crossLink}}
         * @method update
         */
        value: function update(id, item, settings) {
            return ajax(settings, {
                method: 'PUT',
                url: this.uri + '/' + id,
                contentType: 'application/json',
                data: JSON.stringify(item),
                dataType: 'json'
            });
        }
    }, {
        key: 'delete',

        /*jshint -W024 */
        /**
         * {{#crossLink "Client/delete:method"}}{{/crossLink}}
         * @method delete
         */
        value: function _delete(id, settings) {
            return ajax(settings, {
                method: 'DELETE',
                url: this.uri + '/' + id,
                dataType: 'text'
            });
        }
    }]);

    return AjaxClient;
})(Client);

module.exports = AjaxClient;