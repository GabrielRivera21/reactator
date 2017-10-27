/* global require, module */

'use strict';

var _ = require('lodash');

/**
 * Error thrown by {{#crossLink "Client"}}{{/crossLink}} on failed operations.
 *
 * @param {Number} status http status code of the error
 * @param {String} message message of the error
 * @param {String} request request that failed
 * @class ClientError
 * @constructor
 */
function ClientError(status, message, request) {
    this.name = 'ClientError';
    this.status = status || 400;
    this.message = message || 'No message.';
    this.request = request || 'Request not specified.';
}

ClientError.prototype = Object.create(Error.prototype);
_.extend(ClientError.prototype, {
    constructor: ClientError,

    /**
     * @return {Boolean} is unauthorized error
     * @method isUnauthorized
     */
    isUnauthorized: function isUnauthorized() {
        return this.status === 401;
    },

    /**
     * @return {Boolean} is forbidden error
     * @method isForbidden
     */
    isForbidden: function isForbidden() {
        return this.status === 403;
    },

    /**
     * @return {Boolean} is not found
     * @method isNotFound
     */
    isNotFound: function isNotFound() {
        return this.status === 404;
    },

    /**
     * @return {Boolean} is service not available
     * @method isServiceUnavailable
     */
    isServiceUnavailable: function isServiceUnavailable() {
        return this.status === 503;
    }
});

module.exports = ClientError;