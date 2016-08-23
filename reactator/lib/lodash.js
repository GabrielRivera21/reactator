import _ from 'lodash';

const mixins = {
    checkDefined: (val, message) => {
        if (_.isNil(val)) {
            throw Error(message || 'Value is not defined!');
        }
    }
};

_.map(mixins, (value, key) => {
    var mixin = {};

    mixin[key] = value;
    _.mixin(mixin);
});

module.exports = _;
