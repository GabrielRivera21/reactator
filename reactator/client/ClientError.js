import _ from 'lodash';
import HttpStatus from 'http-status-codes';

/**
 * @param {Number} status http status code of the error
 * @param {String} message message of the error
 * @param {String} request request that failed
 * @param {Error} error error to wrap
 * @param {Object} options options to go with the error
 * @class
 * @classdesc Error thrown by {@link module:Reactator.Client} on failed operations.
 * @memberof module:Reactator
 */
function ClientError(status, message, request, error, options) {
    this.name = 'ClientError';
    this.status = status || HttpStatus.BAD_REQUEST;
    this.message = message || 'No message.';
    this.request = request || 'Request not specified.';

    if (options) {
        this.options = options;
    }

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
        return this.status === HttpStatus.UNAUTHORIZED;
    },

    /**
     * @return {Boolean} is forbidden error
     * @inner
     * @memberOf ClientError
     */
    isForbidden: function() {
        return this.status === HttpStatus.FORBIDDEN;
    },

    /**
     * @return {Boolean} is not found
     * @inner
     * @memberOf ClientError
     */
    isNotFound: function() {
        return this.status === HttpStatus.NOT_FOUND;
    },

    /**
     * @return {Boolean} is service not available
     * @inner
     * @memberOf ClientError
     */
    isServiceUnavailable: function() {
        return this.status === HttpStatus.SERVICE_UNAVAILABLE;
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
