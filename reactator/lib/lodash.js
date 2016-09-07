import _ from 'lodash';
import ClientError from '../client/ClientError.js';

function newError(message, status) {
    if (!_.isUndefined(status)) {
        return new ClientError(status, message);
    }

    return new Error(message);
}

const mixins = {
    checkDefined: (obj, message, status) => {
        if (_.isNil(obj)) {
            throw newError(message || 'Value is not defined!', status);
        }

        return obj;
    },

    checkNotDefined: (obj, message, status) => {
        if (!_.isNil(obj)) {
            throw newError(message || 'Value is defined!', status);
        }

        return obj;
    },

    check: (value, message, status) => {
        if (value !== true) {
            throw newError(message || 'Valid is not true!', status);
        }
    }
};

_.map(mixins, (value, key) => {
    var mixin = {};

    mixin[key] = value;
    _.mixin(mixin);
});

module.exports = _;
