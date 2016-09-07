import _ from '../lib/lodash.js';

/**
 * @param {Number} status http status code of the error
 * @param {String} message message of the error
 * @param {String} request request that failed
 * @param {Error} error error to wrap
 * @class
 * @classdesc Error thrown by {@link module:Reactator.Client} on failed operations.
 * @memberof module:Reactator
 */
function ClientError(status, message, request, error) {
    this.name = 'ClientError';
    this.status = status || 400;
    this.message = message || 'No message.';
    this.request = request || 'Request not specified.';

    if (error) {
        this.stack = error.stack;
    }
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

/**
 * @param {Error} error error to wrap
 * @param {Status} status status to set if needed
 * @param {String} message message to set if needed
 * @param {String} request request that failed
 * @return {ClientError} Error of type ClientError
 */
ClientError.from = function(error, status, message, request) {
    if (error instanceof ClientError) {
        return error;
    }

    return new ClientError(status, message || error.message, request, error);
};

module.exports = ClientError;
