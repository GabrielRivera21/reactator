import _ from 'lodash';
import Q from '../lib/q.js';
import $ from '../lib/jquery.js';
import Client from './Client.js';
import ClientError from './ClientError.js';
import ClientResponse from './ClientResponse.js';

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

/**
 * Helper for requesting the ajax and returning the promise
 *
 * @param {Object} settings settings for the request
 * @param {Object} request the request
 * @function
 * @return {Q.Promise} promise for the request
 * @memberof module:Reactator.AjaxClient
 */
const ajax = (settings, request) => {
    return promise($.ajax(_.extend({}, settings, request)));
};

/**
 * @class
 * @classdesc Class representing the implementation of the Client interface utilizing the jQuery's ajax.
 * @memberof module:Reactator
 */
class AjaxClient extends Client {

    /**
     * @param {String} uri uri to the resource
     * @return {undefined}
     */
    constructor(uri) {
        super();

        this.uri = uri;
    }

    /**
     * @param {Object} item item to create
     * @param {Object} settings settings for the ajax request
     * @return {Q.Promise} deferred result of the request
     * @inheritdoc
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
     * @param {String} id id of the item to read
     * @param {Object} settings settings for the ajax request
     * @return {Q.Promise} deferred result of the request
     * @inheritdoc
     */
    read(id, settings) {
        return ajax(settings, {
            method: 'GET',
            url: `${this.uri}/${id}`,
            dataType: 'json'
        });
    }

    /**
     * @param {String} id id of the item to update
     * @param {Object} item item to update to
     * @param {Object} settings settings for the ajax request
     * @return {Q.Promise} deferred result of the request
     * @inheritdoc
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
     * @param {String} id id of the item to delete
     * @param {Object} settings settings for the ajax request
     * @return {Q.Promise} deferred result of the request
     * @inheritdoc
     */
    delete(id, settings) {
        return ajax(settings, {
            method: 'DELETE',
            url: `${this.uri}/${id}`,
            dataType: 'text'
        });
    }
}

AjaxClient.ajax = ajax;

module.exports = AjaxClient;
