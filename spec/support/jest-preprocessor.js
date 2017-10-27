/* global require, module */

'use strict';

var ReactTools = require('react-tools');

/**
 * Preprocessor for running jest unit tests
 *
 * @class JestPreprocessor
 */
module.exports = {
    process: function process(src) {
        return ReactTools.transform(src, { harmony: true });
    }
};