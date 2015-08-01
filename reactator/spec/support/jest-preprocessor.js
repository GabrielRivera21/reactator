/* global require, module */

var ReactTools = require('react-tools');

/**
 * Preprocessor for running jest unit tests
 *
 * @class JestPreprocessor
 */
module.exports = {
    process: function(src) {
        return ReactTools.transform(src, { harmony: true });
    }
};
