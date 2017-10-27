/* global require, module */

/**
 * Wrapper for Q
 *
 * @class Q
 */
'use strict';

var Q = require('q');

Q.longStackSupport = true;

module.exports = Q;