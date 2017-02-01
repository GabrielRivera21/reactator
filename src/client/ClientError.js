import _ from 'lodash';
import HttpStatus from 'http-status-codes';

/**
 * @param {Number} status - http status code of the error
 * @param {String} message - message of the error
 * @param {String} request - request that failed
 * @param {Error} error - error to wrap
 * @param {Object} options - options to go with the error
 *
 * @class
 * @classdesc Error thrown by {@link module:Reactator.Client} on failed operations.
 *
 * @memberOf module:Reactator
 */
function ClientError(status, message, request, error, options) {

    /** @member {String} */
    this.name = 'ClientError';

    /** @member {Number} */
    this.status = status || HttpStatus.BAD_REQUEST;

    /** @member {String} */
    this.message = message || 'No message.';

    /** @member {String} */
    this.request = request || 'Request not specified.';

    if (options) {
        /** @member {Object} */
        this.options = options;
    }

    if (error) {
        /** @member {Object} */
        this.stack = error.stack;
    }
}

ClientError.prototype = Object.create(Error.prototype);
_.extend(ClientError.prototype, {
    constructor: ClientError,

    /**
     * @method module:Reactator.ClientError#isUnauthorized
     * @return {Boolean} is unauthorized error
     */
    isUnauthorized: function() {
        return this.status === HttpStatus.UNAUTHORIZED;
    },

    /**
     * @method module:Reactator.ClientError#isForbidden
     * @return {Boolean} is forbidden error
     */
    isForbidden: function() {
        return this.status === HttpStatus.FORBIDDEN;
    },

    /**
     * @method module:Reactator.ClientError#isNotFound
     * @return {Boolean} is not found
     */
    isNotFound: function() {
        return this.status === HttpStatus.NOT_FOUND;
    },

    /**
     * @method module:Reactator.ClientError#isServiceUnavailable
     * @return {Boolean} is service not available
     */
    isServiceUnavailable: function() {
        return this.status === HttpStatus.SERVICE_UNAVAILABLE;
    }
});

/**
 * @method module:Reactator.ClientError#from
 *
 * @param {Error} error - error to wrap
 * @param {Status} status - status to set if needed
 * @param {String} message - message to set if needed
 * @param {String} request - request that failed
 *
 * @return {ClientError} Error of type ClientError
 */
ClientError.from = function(error, status, message, request) {
    if (error instanceof ClientError) {
        return error;
    }

    return new ClientError(
        status,
        message || error.message,
        request,
        error);
};

module.exports = ClientError;
