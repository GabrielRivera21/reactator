/* global require, module */

/**
 * Wrapper for Q
 *
 * @class Q
 */
const Q = require('q');
Q.longStackSupport = true;

module.exports = Q;
