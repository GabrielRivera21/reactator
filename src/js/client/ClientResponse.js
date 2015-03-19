/* global require, module */

var _ = require('underscore');
var Class = require('../lib/Class.js');

/**
 * Class representing the ClientResponse returned by the {{#crossLink "Client"}}{{/crossLink}}
 *
 * @class ClientResponse
 * @constructor
 */
var ClientResponse = Class.extend({});
_.extend(ClientResponse.prototype, {

    /**
     * @param {Object} value value of the response
     * @param {Number} status status of the response
     * @param {Object} metaData any meta data associated with the response
     * @method initialize
     */
    initialize : function(value, status, metaData) {
        this.value = value;
        this.status = status;
        this.metaData = metaData || {};
    }
});

module.exports = ClientResponse;
