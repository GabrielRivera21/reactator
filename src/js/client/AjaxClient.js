/* global require, module */

var _ = require('underscore');
var Q = require('../lib/q.js');
var $ = require('../lib/jquery.js');
var Client = require('./Client.js');
var ClientError = require('./ClientError.js');
var ClientResponse = require('./ClientResponse.js');

//
// Helper to return a Q.Promise that returns ClientResponse or ClientError for an
// ajax request.
//
function promise($ajax) {
    function getHeaders() {
        var headers = {};
        _.map(
            $ajax.getAllResponseHeaders().trim().split('\n'),
            function(header) {
                var index = header.indexOf(':');
                headers[header.substr(0, index).trim()] = header.substr(index + 1).trim();
            }
        );

        return headers;
    }

    return Q.Promise(function(resolve, reject) {
        /*jshint -W024 */
        Q($ajax)
        .then(function(response) {
            resolve(new ClientResponse(response, $ajax.status, getHeaders()));
        }).catch(function(error) {
            reject(new ClientError(error.status, error.responseText, $ajax));
        });
    });
}

//
// Helper for requesting the ajax and returning the promise
//
function ajax(settings, request) {
    return promise($.ajax(_.extend({}, settings, request)));
}

/**
 * Class representing the implementation of the Client interface utilizing the jQuery's ajax.
 *
 * @class AjaxClient
 * @constructor
 */
var AjaxClient = Client.extend({});
_.extend(AjaxClient.prototype, {

    /**
     * @param {String} uri uri to the resource
     * @method initialize
     */
    initialize : function(uri) {
        this.uri = uri;
    },

    /**
     * {{#crossLink "Client/create:method"}}{{/crossLink}}
     * @method create
     */
    create : function(item, settings) {
        return ajax(settings, {
                method : 'POST',
                url: this.uri,
                contentType: 'application/json',
                data: JSON.stringify(item),
                dataType : 'json'
            });
    },

    /**
     * {{#crossLink "Client/read:method"}}{{/crossLink}}
     * @method read
     */
    read : function(id, settings) {
        return ajax(settings, {
                method : 'GET',
                url: this.uri + '/' + id,
                dataType : 'json'
            });
    },

    /**
     * {{#crossLink "Client/update:method"}}{{/crossLink}}
     * @method update
     */
    update : function(id, item, settings) {
        return ajax(settings, {
                method : 'PUT',
                url: this.uri + '/' + id,
                contentType: 'application/json',
                data: JSON.stringify(item),
                dataType : 'json'
            });
    },

    /*jshint -W024 */
    /**
     * {{#crossLink "Client/delete:method"}}{{/crossLink}}
     * @method delete
     */
    delete : function(id, settings) {
        return ajax(settings, {
                method : 'DELETE',
                url: this.uri + '/' + id,
                dataType : 'text'
            });
    }
});

module.exports = AjaxClient;
