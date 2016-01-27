/* global require, module */

const
    Client = require('./Client.js');

/**
 * Class wrapping the {{#crossLink "Client"}}{{/crossLink}}.
 *
 * @class ClientWrapper
 * @constructor
 */
class ClientWrapper extends Client {
    /* eslint no-unused-vars: 0 */

    /**
     * @param {Client} client client to decorate
     * @constructor
     */
    constructor(client) {
        super();

        if (!(client instanceof Client)) {
            throw new Error('ClientWrapper can only wrap instance of the Client.');
        }

        this.client = client;
    }

    /**
     * {{#crossLink "Client/create:method"}}{{/crossLink}}
     * @param {Object} item item to create
     * @param {Object} settings settings for the ajax request
     * @method create
     * @returns {Q.Promise} deferred result of the request
     */
    create(item, settings) {
        return this.client.create(item, settings);
    }

    /**
     * {{#crossLink "Client/read:method"}}{{/crossLink}}
     * @param {String} id id of the item to read
     * @param {Object} settings settings for the ajax request
     * @method read
     * @returns {Q.Promise} deferred result of the request
     */
    read(id, settings) {
        return this.client.read(id, settings);
    }

    /**
     * {{#crossLink "Client/update:method"}}{{/crossLink}}
     * @param {String} id id of the item to update
     * @param {Object} item item to update to
     * @param {Object} settings settings for the ajax request
     * @method update
     * @returns {Q.Promise} deferred result of the request
     */
    update(id, item, settings) {
        return this.client.update(id, item, settings);
    }

    /**
     * {{#crossLink "Client/delete:method"}}{{/crossLink}}
     * @param {String} id id of the item to delete
     * @param {Object} settings settings for the ajax request
     * @method delete
     * @returns {Q.Promise} deferred result of the request
     */
    delete(id, settings) {
        return this.client.delete(id, settings);
    }
}

module.exports = ClientWrapper;
