/* global require, module */

var _ = require('underscore');
var Client = require('./Client.js');

/**
 * Class wrapping the {{#crossLink "Client"}}{{/crossLink}}.
 *
 * @class ClientWrapper
 * @constructor
 */
var ClientWrapper = Client.extend({});
_.extend(ClientWrapper.prototype, {
    /*jshint unused:false*/

    /**
     * @param {Client} client client to decorate
     * @method initialize
     */
    initialize : function(client) {
        if (!(client instanceof Client)) {
            throw new Error("ClientWrapper can only wrap instance of the Client.");
        }

        this.client = client;
    },

    /**
     * {{#crossLink "Client/create:method"}}{{/crossLink}}
     * @method create
     */
    create : function(item, settings) {
        return this.client.create(item, settings);
    },

    /**
     * {{#crossLink "Client/read:method"}}{{/crossLink}}
     * @method read
     */
    read : function(id, settings) {
        return this.client.read(id, settings);
    },

    /**
     * {{#crossLink "Client/update:method"}}{{/crossLink}}
     * @method update
     */
    update : function(id, item, settings) {
        return this.client.update(id, item, settings);
    },

    /*jshint -W024 */
    /**
     * {{#crossLink "Client/delete:method"}}{{/crossLink}}
     * @method delete
     */
    delete : function(id, settings) {
        return this.client.delete(id, settings);
    }
});

module.exports = ClientWrapper;
