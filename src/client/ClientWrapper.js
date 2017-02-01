import Client from './Client.js';

/**
 * @class
 * @classdesc Class wrapping the {@link module:Reactator.Client}
 * @memberOf module:Reactator
 *
 * @param {Client} client - client to decorate
 */
class ClientWrapper extends Client {
    /* eslint no-unused-vars: 0 */
    constructor(client) {
        super();

        if (!(client instanceof Client)) {
            throw new Error('ClientWrapper can only wrap instance of the Client.');
        }

        /** @member {Client} */
        this.client = client;
    }

    /**
     * @method module:Reactator.ClientWrapper#create
     * @overrides
     *
     * @param {Object} item - item to create
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    create(item, settings) {
        return this.client.create(item, settings);
    }

    /**
     * @method module:Reactator.ClientWrapper#read
     * @overrides
     *
     * @param {String} id - id of the item to read
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    read(id, settings) {
        return this.client.read(id, settings);
    }

    /**
     * @method module:Reactator.ClientWrapper#update
     * @overrides
     *
     * @param {String} id - id of the item to update
     * @param {Object} item - item to update to
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    update(id, item, settings) {
        return this.client.update(id, item, settings);
    }

    /**
     * @method module:Reactator.ClientWrapper#delete
     * @overrides
     *
     * @param {String} id - id of the item to delete
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    delete(id, settings) {
        return this.client.delete(id, settings);
    }
}

module.exports = ClientWrapper;
