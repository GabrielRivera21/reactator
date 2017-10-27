/* global require, module */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash'),
    Q = require('../lib/q'),
    ClientError = require('./ClientError.js'),
    ClientResponse = require('./ClientResponse.js');

//
// Simple Q.Promise to throw method not implemented error.
//
var methodNotImplementedPromise = Q.Promise(
/*jshint unused:false*/
function (resolve, reject, notify) {
    reject(new ClientError(400, 'Method not implemented!'));
});

/**
 * Class representing the common interface for the client.
 *
 * @class Client
 * @constructor
 */

var Client = (function () {
    function Client() {
        _classCallCheck(this, Client);
    }

    _createClass(Client, [{
        key: 'create',

        /*jshint unused:false*/

        /**
         * Creates a new item in the resource container.
         *
         * @param {Object} item item to create
         * @param {Object} settings settings for performing the create
         * @return {ClientResponse} id of the newly created item (Q.Promise)
         * @throws {ClientError} on failure to perform the create
         * @method create
         */
        value: function create(item, settings) {
            return methodNotImplementedPromise;
        }
    }, {
        key: 'read',

        /**
         * Reads an item represented by the id.
         *
         * @param {String} id id of the item to read
         * @param {Object} settings settings for performing the read
         * @return {ClientResponse} item item represented by the id (Q.Promise)
         * @throws {ClientError} on failure to perform the read
         * @method read
         */
        value: function read(id, settings) {
            return methodNotImplementedPromise;
        }
    }, {
        key: 'update',

        /**
         * Updates an existing item in the resource container.
         *
         * @param {String} id id of the item
         * @param {Object} item item to update to
         * @param {Object} settings settings for performing the update
         * @return {ClientResponse} update response (Q.Promise)
         * @throws {ClientError} on failure to perform the update
         * @method update
         */
        value: function update(id, item, settings) {
            return methodNotImplementedPromise;
        }
    }, {
        key: 'delete',

        /*jshint -W024 */
        /**
         * Deletes an new item in the resource container.
         *
         * @param {String} id id of the item
         * @param {Object} settings settings for performing the create
         * @return {ClientResponse} delete response (Q.Promise)
         * @throws {ClientError} on failure to perform the delete operation
         * @method delete
         */
        value: function _delete(id, settings) {
            return methodNotImplementedPromise;
        }
    }]);

    return Client;
})();

module.exports = Client;