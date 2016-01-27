/* global require, module */

/**
 * Class representing the ClientResponse returned by the {{#crossLink "Client"}}{{/crossLink}}
 *
 * @class ClientResponse
 * @constructor
 */
class ClientResponse {
    /**
     * @param {Object} value value of the response
     * @param {Number} status status of the response
     * @param {Object} metaData any meta data associated with the response
     * @constructor
     */
    constructor(value, status, metaData) {
        this.value = value;
        this.status = status;
        this.metaData = metaData || {};
    }
}

module.exports = ClientResponse;
