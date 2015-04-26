/* global require, module */

var Client = require('./Client.js');

/**
 * Class wrapping the {{#crossLink "Client"}}{{/crossLink}}.
 *
 * @class ClientWrapper
 * @constructor
 */
class ClientWrapper extends Client {
    /*jshint unused:false*/

    /**
     * @param {Client} client client to decorate
     * @method initialize
     */
    constructor(client) {
        super();

        if (!(client instanceof Client)) {
            throw new Error("ClientWrapper can only wrap instance of the Client.");
        }

        this.client = client;
    }

    /**
     * {{#crossLink "Client/create:method"}}{{/crossLink}}
     * @method create
     */
    create(item, settings) {
        return this.client.create(item, settings);
    }

    /**
     * {{#crossLink "Client/read:method"}}{{/crossLink}}
     * @method read
     */
    read(id, settings) {
        return this.client.read(id, settings);
    }

    /**
     * {{#crossLink "Client/update:method"}}{{/crossLink}}
     * @method update
     */
    update(id, item, settings) {
        return this.client.update(id, item, settings);
    }

    /*jshint -W024 */
    /**
     * {{#crossLink "Client/delete:method"}}{{/crossLink}}
     * @method delete
     */
    delete(id, settings) {
        return this.client.delete(id, settings);
    }
}

module.exports = ClientWrapper;
