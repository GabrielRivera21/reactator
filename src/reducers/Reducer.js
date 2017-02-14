/* eslint no-unused-vars: 0 */

import _ from '../lib/lodash.js';
import LOGGER from 'loglevel';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {browserHistory} from 'react-router';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

// TEST: Complete test coverage

/**
 * @class
 * @classdesc Class representing the common interface for a reducer
 * @memberOf module:Reactator
 *
 * @param {String} name - name of the reducer
 */
export class Reducer {
    constructor(name) {
        _.checkDefined(name, 'Name is required!');

        /** @member {String} */
        this.name = name;
    }

    /**
     * @method module:Reactator.Reducer#getName
     *
     * @return {String} name of the reducer
     */
    getName() {
        return this.name;
    }

    /**
     * @method module:Reactator.Reducer#apply
     *
     * @param  {Object} state - current state
     * @param  {Object} action - action
     * @return {Object} new state
     */
    apply(state = {}, action) {
        return state;
    }
};

/**
 * @class
 * @classdesc Reducer Wrapper mapping the action type to reducer methods via camelCase transformation of tye action.type
 * @extends {module:Reactator.Reducer}
 * @memberOf module:Reactator
 *
 * @param {String} reducer - reducer to wrap
 */
export class ReducerWrapper extends Reducer {
    constructor(reducer) {
        super(reducer.getName());

        _.check(reducer instanceof Reducer, 'Expecting a Reducer!');
        this.reducer = reducer;
    }

    /**
     * @method module:Reactator.ReducerWrapper#apply
     * @overrides
     *
     * @description Makes a call to the reducer's method if existing. e.g.,
     * action 'ADD_TODO' will result in call to ADD_TODO if existing; otherwise apply will be called.
     *
     * @param  {Object} state - current state
     * @param  {Object} action - action
     * @return {Object} new state
     */
    apply(state, action) {
        if (_.isFunction(this.reducer[action.type])) {
            return this.reducer[action.type](state, action);
        } else {
            return this.reducer.apply(state, action);
        }
    }
}

/**
 * @class
 * @classdesc Simple Reducer class taking a method and name on construction
 * @extends {module:Reactator.Reducer}
 * @memberOf module:Reactator
 *
 * @param {String} name - name of the reducer
 * @param {function} method - method to wrap as reducer
 */
export class SimpleReducer extends Reducer {
    constructor(name, method) {
        super(name);

        _.check(_.isFunction(method), 'Invalid method for the SimpleReducer, expecting a function!');
        this._method = method;
    }

    /**
     * @method module:Reactator.SimpleReducer#apply
     * @overrides
     *
     * @description Simply calls the method specified on the construction of the SimpleReducer.
     *
     * @param  {Object} state - current state
     * @param  {Object} action - action
     * @return {Object} new state
     */
    apply(state, action) {
        let method = this._method;

        return method(state, action);
    }
}

/**
 * @class
 * @classdesc Builder class for putting together a group of reducers, middlewares, enhancers, etc
 *            for constructing a [redux store]{@link http://redux.js.org/docs/api/Store.html}.
 * @memberOf module:Reactator
 */
export class ReduxStoreBuilder {
    constructor() {
        this._reducers = [];
        this._middlewares = [];
        this._enhancers = [];
        this._initialState = undefined;
        this._loggerOptions = {
            enabled: true,
            level: 'log',
            collapsed: true,
            duration: true
        };
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withReactRouter
     *
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     * @see [react-router-redux]{@link https://github.com/reactjs/react-router-redux}
     */
    withReactRouter() {
        return this
            .withReducerMethod('routing', routerReducer)
            .withMiddleware(routerMiddleware(browserHistory));
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withLoggerOptions
     *
     * @param {Object} options options for the [redux-logger]{@link https://www.npmjs.com/package/redux-logger}
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     */
    withLoggerOptions(options) {
        this._loggerOptions = {
            ...this._loggerOptions,
            ...options
        };

        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withReducerMethod
     *
     * @param {String} name - name of the reducer
     * @param {function} method - method for the reducer
     *
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     *
     * @see {@link module:Reactator.SimpleReducer}
     */
    withReducerMethod(name, method) {
        return this.withReducer(new SimpleReducer(name, method));
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withReducerMethods
     *
     * @param {Object} methods -- mapping of name to methods
     *
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     *
     * @see {@link module:Reactator.SimpleReducer}
     */
    withReducerMethods(methods) {
        _.map(methods, (method, name) => {
            this.withReducerMethod(name, method);
        });

        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withReducer
     *
     * @param {module:Reactator.Reducer} reducer - reducer to append
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     */
    withReducer(reducer) {
        _.check(reducer instanceof Reducer, 'Invalid reducer!');

        let name = reducer.getName();

        _.checkDefined(name, 'Name has to be defined!');
        _.checkNotDefined(this._reducers[name], `Conflict! Reducer name '${name}' is already in use!`);
        this._reducers[name] = ::reducer.apply;

        LOGGER.trace(`\twith reducer ${reducer.getName()}.`);
        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withReducers
     *
     * @param {module:Reactator.Reducer[]} reducers - reducers of [reducers]{@link module:Reactator.Reducer} to append
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     */
    withReducers(reducers) {
        _.check(_.isArray(reducers), `Invalid type of '${typeof reducers}' reducers, expecting an array!`);

        _.map(reducers, (reducer) => {
            this.withReducer(reducer);
        });

        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withMiddleware
     *
     * @param {Object} middleware - middleware to apply to the redux store
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     *
     * @see [redux store]{@link http://redux.js.org/docs/api/Store.html}
     */
    withMiddleware(middleware) {
        _.check(_.isFunction(middleware), `Invalid type of '${typeof middleware}' middleware, expecting a function!`);

        this._middlewares.push(middleware);
        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withEnhancer
     *
     * @param {Object} enhancer - enhancer to apply to the redux store
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     *
     * @see [redux store]{@link http://redux.js.org/docs/api/Store.html}
     */
    withEnhancer(enhancer) {
        _.check(_.isFunction(enhancer), `Invalid type of '${typeof enhancer}' enhancer, expecting a function!`);

        this._enhancers.push(enhancer);
        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#withInitialState
     *
     * @param {Object} state - initial state to apply to the redux store
     * @return {module:Reactator.ReduxStoreBuilder} this builder
     *
     * @see [redux store]{@link http://redux.js.org/docs/api/Store.html}
     */
    withInitialState(state) {
        this._initialState = state;
        return this;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#reducer
     *
     * @return {function} outcome of the redux combineReducers for the specified group of reducers
     *
     * @see [redux combineReducers]{@link http://redux.js.org/docs/api/combineReducers.html}
     */
    reducer() {
        return combineReducers(this._reducers);
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#state
     *
     * @return {Object} the current initial state
     */
    state() {
        return {...this._initialState};
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#middlewares
     *
     * @return {Array} array of middlewares including redux-thunk, redux-promise, and redux-logger
     *
     * @see [redux-thunk]{@link https://www.npmjs.com/package/redux-thunk}
     * @see [redux-promise]{@link https://www.npmjs.com/package/redux-promise}
     * @see [redux-logger]{@link https://www.npmjs.com/package/redux-logger}
     */
    middlewares() {
        const entries = [
            ...this._middlewares,
            thunk,
            promise,
        ];

        if (this._loggerOptions.enabled) {
            entries.push(createLogger(this._loggerOptions));
        }

        return entries;
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#enhancers
     *
     * @return {Array} array of all enhancers to be applied to the store
     *
     * @see [redux store]{@link http://redux.js.org/docs/api/Store.html}
     */
    enhancers() {
        return [
            applyMiddleware(...this.middlewares()),
            ...this._enhancers
        ];
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#enhancer
     *
     * @return {Object} enhancer composed of all enhancers specified in the builder
     *
     * @see [redux compose]{@link http://redux.js.org/docs/api/compose.html}
     * @see [redux dev tools extension]{@link https://github.com/zalmoxisus/redux-devtools-extension}
     * @see [redux dev tools]{@link https://github.com/gaearon/redux-devtools}
     */
    enhancer() {
        return composeWithDevTools(...this.enhancers());
    }

    /**
     * @method module:Reactator.ReduxStoreBuilder#build
     *
     * @return {Object} store, redux store resulting from the combine method
     *
     * @see [redux store]{@link http://redux.js.org/docs/api/Store.html}
     */
    build() {
        return createStore(
            this.reducer(),
            this.state(),
            this.enhancer()
        );
    }
}
