/**
 * @class
 * @classdesc Class representing the ClientResponse returned by the {@link module:Reactator.Client}
 * @memberOf module:Reactator
 *
 * @param {Object} value - value of the response
 * @param {Number} status - status of the response
 * @param {Object} metaData - any meta data associated with the response
 */
class ClientResponse {
    constructor(value, status, metaData) {
        /** @member {Object} */
        this.value = value;

        /** @member {Number} */
        this.status = status;

        /** @member {Object} */
        this.metaData = metaData || {};
    }
}

module.exports = ClientResponse;
