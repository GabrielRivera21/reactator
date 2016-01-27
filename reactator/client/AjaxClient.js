/* global require, module */

const
    _ = require('lodash'),
    Q = require('../lib/q.js'),
    $ = require('../lib/jquery.js'),
    Client = require('./Client.js'),
    ClientError = require('./ClientError.js'),
    ClientResponse = require('./ClientResponse.js');

//
// Helper to return a Q.Promise that returns ClientResponse or ClientError for an
// ajax request.
//
const promise = ($ajax) => {
    const getHeaders = () => {
        const headers = {};

        _.map(
            $ajax.getAllResponseHeaders().trim().split('\n'),
            (header) => {
                var index = header.indexOf(':');

                headers[header.substr(0, index).trim()] = header.substr(index + 1).trim();
            }
        );

        return headers;
    };

    return Q.Promise(function(resolve, reject) {
        Q($ajax)
        .then((response) => resolve(new ClientResponse(response, $ajax.status, getHeaders())))
        .catch((error) => reject(new ClientError(error.status, error.responseText, $ajax)))
        .done();
    });
};

//
// Helper for requesting the ajax and returning the promise
//
const ajax = (settings, request) => {
    return promise($.ajax(_.extend({}, settings, request)));
};

/**
 * Class representing the implementation of the Client interface utilizing the jQuery's ajax.
 *
 * @class AjaxClient
 * @constructor
 */
class AjaxClient extends Client {

    /**
     * @param {String} uri uri to the resource
     * @constructor
     */
    constructor(uri) {
        super();

        this.uri = uri;
    }

    /**
     * {{#crossLink "Client/create:method"}}{{/crossLink}}
     * @param {Object} item item to create
     * @param {Object} settings settings for the ajax request
     * @method create
     * @returns {Q.Promise} deferred result of the request
     */
    create(item, settings) {
        return ajax(settings, {
            method: 'POST',
            url: this.uri,
            contentType: 'application/json',
            data: JSON.stringify(item),
            dataType: 'json'
        });
    }

    /**
     * {{#crossLink "Client/read:method"}}{{/crossLink}}
     * @param {String} id id of the item to read
     * @param {Object} settings settings for the ajax request
     * @method read
     * @returns {Q.Promise} deferred result of the request
     */
    read(id, settings) {
        return ajax(settings, {
            method: 'GET',
            url: `${this.uri}/${id}`,
            dataType: 'json'
        });
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
        return ajax(settings, {
            method: 'PUT',
            url: `${this.uri}/${id}`,
            contentType: 'application/json',
            data: JSON.stringify(item),
            dataType: 'json'
        });
    }

    /*jshint -W024 */
    /**
     * {{#crossLink "Client/delete:method"}}{{/crossLink}}
     * @param {String} id id of the item to delete
     * @param {Object} settings settings for the ajax request
     * @method delete
     * @returns {Q.Promise} deferred result of the request
     */
    delete(id, settings) {
        return ajax(settings, {
            method: 'DELETE',
            url: `${this.uri}/${id}`,
            dataType: 'text'
        });
    }
}

module.exports = AjaxClient;
