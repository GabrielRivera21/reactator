import _ from 'lodash';

const mixins = {
    checkDefined: (obj, message) => {
        if (_.isNil(obj)) {
            throw Error(message || 'Value is not defined!');
        }

        return obj;
    },

    checkNotDefined: (obj, message) => {
        if (!_.isNil(obj)) {
            throw Error(message || 'Value is defined!');
        }

        return obj;
    }
};

_.map(mixins, (value, key) => {
    var mixin = {};

    mixin[key] = value;
    _.mixin(mixin);
});

module.exports = _;
