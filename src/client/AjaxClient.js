import _ from '../lib/lodash.js';
import Promise from 'bluebird';
import $ from '../lib/jquery.js';
import Client from './Client.js';
import ClientError from './ClientError.js';
import ClientResponse from './ClientResponse.js';

//
// Helper to return a Promise that returns ClientResponse or ClientError for an
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

    return Promise.resolve($ajax)
        .then((response) => {
            return new ClientResponse(response, $ajax.status, getHeaders());
        }).catch((error) => {
            throw new ClientError(error.status, error.responseText, $ajax);
        });
};

/**
 * @method module:Reactator.AjaxClient#ajax
 * @description Helper for requesting the ajax and returning the promise
 *
 * @param {Object} base - base
 * @param {Object} settings - settings for the request
 * @param {Object} request - the request
 *
 * @return {Promise} promise for the request
 */
const ajax = (base, settings, request) => {
    return promise($.ajax(_.extend({}, base, settings, request)));
};

/**
 * @class
 * @classdesc Class representing the implementation of the Client interface utilizing the jQuery's ajax.
 * @extends {module:Reactator.Client}
 * @memberOf module:Reactator
 *
 * @param {String} uri - uri to the resource
 */
class AjaxClient extends Client {
    constructor(uri) {
        super();

        /** @member {String} */
        this.uri = uri;
    }

    /**
     * @method module:Reactator.AjaxClient#create
     * @overrides
     *
     * @param {Object} item - item to create
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    create(item, settings) {
        return ajax(
            {
                dataType: 'json'
            },
            settings,
            {
                method: 'POST',
                url: this.uri,
                contentType: 'application/json',
                data: JSON.stringify(item)
            });
    }

    /**
     * @method module:Reactator.AjaxClient#read
     * @override
     *
     * @param {String} id - id of the item to read
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    read(id, settings) {
        return ajax(
            {
                dataType: 'json'
            },
            settings,
            {
                method: 'GET',
                url: `${this.uri}/${id}`
            });
    }

    /**
     * @method module:Reactator.AjaxClient#update
     * @override
     *
     * @param {String} id - id of the item to update
     * @param {Object} item - item to update to
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    update(id, item, settings) {
        return ajax(
            {
                dataType: 'json'
            },
            settings,
            {
                method: 'PUT',
                url: `${this.uri}/${id}`,
                contentType: 'application/json',
                data: JSON.stringify(item)
            });
    }

    /**
     * @method module:Reactator.AjaxClient#delete
     * @override
     *
     * @param {String} id - id of the item to delete
     * @param {Object} settings - settings for the ajax request
     *
     * @return {Promise} deferred result of the request
     */
    delete(id, settings) {
        return ajax(
            {
                dataType: 'text'
            },
            settings,
            {
                method: 'DELETE',
                url: `${this.uri}/${id}`
            });
    }
}

AjaxClient.ajax = ajax;
module.exports = AjaxClient;
