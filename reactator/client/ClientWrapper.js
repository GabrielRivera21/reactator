import Client from './Client.js';

/**
 * @class
 * @classdesc Class wrapping the {@link module:Reactator.Client}.
 * @memberof module:Reactator
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
     * @param {Object} item item to create
     * @param {Object} settings settings for the ajax request
     * @return {Promise} deferred result of the request
     * @inheritdoc
     */
    create(item, settings) {
        return this.client.create(item, settings);
    }

    /**
     * @param {String} id id of the item to read
     * @param {Object} settings settings for the ajax request
     * @return {Promise} deferred result of the request
     * @inheritdoc
     */
    read(id, settings) {
        return this.client.read(id, settings);
    }

    /**
     * @param {String} id id of the item to update
     * @param {Object} item item to update to
     * @param {Object} settings settings for the ajax request
     * @return {Promise} deferred result of the request
     * @inheritdoc
     */
    update(id, item, settings) {
        return this.client.update(id, item, settings);
    }

    /**
     * @param {String} id id of the item to delete
     * @param {Object} settings settings for the ajax request
     * @return {Promise} deferred result of the request
     * @inheritdoc
     */
    delete(id, settings) {
        return this.client.delete(id, settings);
    }
}

module.exports = ClientWrapper;
