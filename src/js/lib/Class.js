/* global require, module */

var _ = require('underscore');
var Backbone = require('./backbone.js');

/**
 * Helper for creation OO objects in Javascript.
 * @example
 *     var Foo = Class.extend({});
 *     _.extend(Foo.prototype, {
 *         hello : function() {
 *             console.log('foo');
 *         }
 *     });
 *
 *      var Bar = Foo.extend({});
 *      _.extend(Bar.prototype, {
 *          hello : function() {
 *              console.log('bar');
 *              Bar.__super__.hello.call(this);
 *          }
 *      });
 *
 * @class Class
 */
var Class = function() {
    this.initialize.apply(this, arguments);
};

_.extend(Class.prototype, {

    /**
     * Basically the constructor, it is called with the arguments passed on the new.
     *
     * @method initialize
     */
    initialize : function() {
    }
});

/**
 * Backbone's extend method, to provide proper inheritence
 *
 * @method extend
 */
Class.extend = Backbone.Model.extend;

module.exports = Class;
