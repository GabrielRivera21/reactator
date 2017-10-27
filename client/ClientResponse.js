/* global require, module */

/**
 * Class representing the ClientResponse returned by the {{#crossLink "Client"}}{{/crossLink}}
 *
 * @class ClientResponse
 * @constructor
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientResponse =
/**
 * @param {Object} value value of the response
 * @param {Number} status status of the response
 * @param {Object} metaData any meta data associated with the response
 * @method initialize
 */
function ClientResponse(value, status, metaData) {
  _classCallCheck(this, ClientResponse);

  this.value = value;
  this.status = status;
  this.metaData = metaData || {};
};

module.exports = ClientResponse;