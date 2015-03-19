/* global require, module */

var _ = require('underscore');
var Q = require('../lib/q.js');
var Class = require('../lib/Class.js');
var ClientError = require('./ClientError.js');
var ClientResponse = require('./ClientResponse.js');

//
// Simple Q.Promise to throw method not implemented error.
//
var methodNotImplementedPromise = Q.Promise(
    /*jshint unused:false*/
    function(resolve, reject, notify) {
        reject(new ClientError(400, "Method not implemented!"));
    }
);

/**
 * Class representing the common interface for the client.
 *
 * @class Client
 * @constructor
 */
var Client = Class.extend({});
_.extend(Client.prototype, {
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
    create : function(item, settings) {
        return methodNotImplementedPromise;
    },

    /**
     * Reads an item represented by the id.
     *
     * @param {String} id id of the item to read
     * @param {Object} settings settings for performing the read
     * @return {ClientResponse} item item represented by the id (Q.Promise)
     * @throws {ClientError} on failure to perform the read
     * @method read
     */
    read : function(id, settings) {
        return methodNotImplementedPromise;
    },

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
    update : function(id, item, settings) {
        return methodNotImplementedPromise;
    },

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
    delete : function(id, settings) {
        return methodNotImplementedPromise;
    }
});

module.exports = Client;
