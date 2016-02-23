import _ from 'lodash';

/**
 * Error thrown by {{#crossLink "Client"}}{{/crossLink}} on failed operations.
 *
 * @param {Number} status http status code of the error
 * @param {String} message message of the error
 * @param {String} request request that failed
 * @class ClientError
 * @memberof module:Reactator
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
     * @inner
     * @memberOf ClientError
     */
    isUnauthorized: function() {
        return this.status === 401;
    },

    /**
     * @return {Boolean} is forbidden error
     * @inner
     * @memberOf ClientError
     */
    isForbidden: function() {
        return this.status === 403;
    },

    /**
     * @return {Boolean} is not found
     * @inner
     * @memberOf ClientError
     */
    isNotFound: function() {
        return this.status === 404;
    },

    /**
     * @return {Boolean} is service not available
     * @inner
     * @memberOf ClientError
     */
    isServiceUnavailable: function() {
        return this.status === 503;
    }
});

module.exports = ClientError;
