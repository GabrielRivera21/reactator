/* global jest, describe, afterEach, beforeEach, require, it, expect */

jest.autoMockOff();
jest.mock('../../lib/jquery.js');

var Q = require('../../lib/q.js');

function successfulAjaxResponse() {
    var p = Q.Promise(function(resolve) {
        resolve({foo: 'bar'});
    });

    p.getAllResponseHeaders = function() {
        return 'foo: bar\nhello: world\n';
    };

    p.status = 200;

    return p;
}

describe('AjaxClient', function() {
    var $;
    var AjaxClient;
    var ClientResponse;
    var ac;

    beforeEach(function() {
        $ = require('../../lib/jquery.js');

        AjaxClient = require('../AjaxClient.js');
        ClientResponse = require('../ClientResponse.js');
        ac = new AjaxClient('uri');
    });

    afterEach(function() {
        jest.runAllTicks();
    });

    it('should pass headers in response', function() {
        $.ajax.mockImplementation(successfulAjaxResponse);

        Q(ac.read('foo'))
            .then(function(response) {
                expect(response instanceof ClientResponse).toBeTruthy();
                expect(response.status).toBe(200);
                expect(response.value.foo).toBe('bar');
                expect(response.metaData.foo).toBe('bar');
                expect(response.metaData.hello).toBe('world');
            })
            .catch(function() {
                expect(true).toBeFalsy();
            })
            .done();
    });

    it('should reject with ClientError on failure', function() {
        $.ajax.mockImplementation(function() {
            return Q.Promise(function(resolve, reject) {
                reject({
                    status: 400,
                    responseText: 'Bad Request'
                });
            });
        });

        Q(ac.read('foo'))
            .then(function() {
                expect(true).toBeFalsy();
            })
            .catch(function(error) {
                expect(error.name).toBe('ClientError');
                expect(error.status).toBe(400);
                expect(error.message).toBe('Bad Request');
            })
            .done();
    });

    it('should read with GET request and uri/id for a json', function() {
        $.ajax.mockImplementation(successfulAjaxResponse);

        Q(ac.read('foo'))
            .then(function() {})
            .catch(function() {})
            .done(function() {
                expect($.ajax.mock.calls.length).toBe(1);
                expect($.ajax.mock.calls[0][0].method).toBe('GET');
                expect($.ajax.mock.calls[0][0].url).toBe('uri/foo');
                expect($.ajax.mock.calls[0][0].dataType).toBe('json');
            });
    });

    it('should create with POST request with uri/ and json body', function() {
        $.ajax.mockImplementation(successfulAjaxResponse);

        Q(ac.create({foo: 'bar'}, {headers: {token: 1234}}))
            .then(function() {})
            .catch(function() {})
            .done(function() {
                expect($.ajax.mock.calls.length).toBe(1);
                expect($.ajax.mock.calls[0][0].method).toBe('POST');
                expect($.ajax.mock.calls[0][0].url).toBe('uri');
                expect($.ajax.mock.calls[0][0].dataType).toBe('json');
                expect($.ajax.mock.calls[0][0].data).toBe('{"foo":"bar"}');
                expect($.ajax.mock.calls[0][0].headers.token).toBe(1234);
            });
    });

    it('should update with PUT request with uri/id and json body', function() {
        $.ajax.mockImplementation(successfulAjaxResponse);

        Q(ac.update('foo', {foo: 'bar'}))
            .then(function() {})
            .catch(function() {})
            .done(function() {
                expect($.ajax.mock.calls.length).toBe(1);
                expect($.ajax.mock.calls[0][0].method).toBe('PUT');
                expect($.ajax.mock.calls[0][0].url).toBe('uri/foo');
                expect($.ajax.mock.calls[0][0].dataType).toBe('json');
                expect($.ajax.mock.calls[0][0].data).toBe('{"foo":"bar"}');
            });
    });

    it('should delete with DELETE request with uri/id', function() {
        $.ajax.mockImplementation(successfulAjaxResponse);

        Q(ac.delete('foo'))
            .then(function() {})
            .catch(function() {})
            .done(function() {
                expect($.ajax.mock.calls.length).toBe(1);
                expect($.ajax.mock.calls[0][0].method).toBe('DELETE');
                expect($.ajax.mock.calls[0][0].url).toBe('uri/foo');
                expect($.ajax.mock.calls[0][0].dataType).toBe('text');
            });
    });
});
