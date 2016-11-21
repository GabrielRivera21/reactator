import Promise from 'bluebird';
import ClientError from './ClientError.js';

/**
 * Simple Promise to throw method not implemented error.
 *
 * @member MethodNotSupported
 * @memberof module:Reactator.Client
 */
const MethodNotSupported = Promise.reject(new ClientError(405, 'Method Not Supported!'));

/**
 * @class
 * @classdesc Class representing the common interface for the client.
 * @memberof module:Reactator
 */
class Client {
    /* eslint no-unused-vars: 0 */

    /**
     * Creates a new item in the resource container.
     *
     * @param {Object} item item to create
     * @param {Object} settings settings for performing the create
     * @return {ClientResponse} id of the newly created item (Promise)
     * @throws {ClientError} on failure to perform the create
     */
    create(item, settings) {
        return MethodNotSupported;
    }

    /**
     * Reads an item represented by the id.
     *
     * @param {String} id id of the item to read
     * @param {Object} settings settings for performing the read
     * @return {ClientResponse} item item represented by the id (Promise)
     * @throws {ClientError} on failure to perform the read
     */
    read(id, settings) {
        return MethodNotSupported;
    }

    /**
     * Updates an existing item in the resource container.
     *
     * @param {String} id id of the item
     * @param {Object} item item to update to
     * @param {Object} settings settings for performing the update
     * @return {ClientResponse} update response (Promise)
     * @throws {ClientError} on failure to perform the update
     */
    update(id, item, settings) {
        return MethodNotSupported;
    }

    /*jshint -W024 */
    /**
     * Deletes an new item in the resource container.
     *
     * @param {String} id id of the item
     * @param {Object} settings settings for performing the create
     * @return {ClientResponse} delete response (Promise)
     * @throws {ClientError} on failure to perform the delete operation
     */
    delete(id, settings) {
        return MethodNotSupported;
    }
}

Client.MethodNotSupported = MethodNotSupported;

module.exports = Client;
