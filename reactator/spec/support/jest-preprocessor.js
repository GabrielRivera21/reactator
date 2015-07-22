/* global require, module */

/**
 * Preprocessor for running jest unit tests
 *
 * @class JestPreprocessor
 */
var ReactTools = require('react-tools');
module.exports = {
    process: function(src) {
        return ReactTools.transform(src, { harmony: true });
    }
};
