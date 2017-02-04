import _ from '../lib/lodash.js';
import React from 'react';

// TEST:

/**
 * @class
 * @classdesc React component ReactLifeCycleCallback calling back on all react life cycle calls
 * @memberOf module:Reactator
 *
 * @example
 * <ReactLifeCycleCallback onComponentDidMount={::this.onComponentDidMount}>
 *     <FooComponent />
 *     <BarComponent />
 * </ReactLifeCycleCallback>
 *
 * @param {Object} props - props for the component
 * @param {function} props.onConstructor - callback on Constructor
 * @param {function} props.onComponentDidMount - callback on ComponentDidMount
 * @param {function} props.onComponentDidUpdate - callback on ComponentDidUpdate
 * @param {function} props.onComponentWillMount - callback on ComponentWillMount
 * @param {function} props.onComponentWillReceiveProps - callback on ComponentWillReceiveProps
 * @param {function} props.onComponentWillUnmount - callback on ComponentWillUnmount
 * @param {function} props.onComponentWillUpdate - callback on ComponentWillUpdate
 * @param {function} props.onShouldComponentUpdate - callback on ShouldComponentUpdate
 */
export default class ReactLifeCycleCallback extends React.PureComponent {
    constructor(props) {
        super(props);

        if (_.isFunction(this.props.onConstructor)) {
            this.props.onConstructor(this);
        }
    }

    componentWillMount() {
        if (_.isFunction(this.props.onComponentWillMount)) {
            this.props.onComponentWillMount(this);
        }
    }

    componentDidMount() {
        if (_.isFunction(this.props.onComponentDidMount)) {
            this.props.onComponentDidMount(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (_.isFunction(this.props.onComponentWillReceiveProps)) {
            this.props.onComponentWillReceiveProps(this, nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isFunction(this.props.onShouldComponentUpdate)) {
            this.props.onShouldComponentUpdate(this, nextProps, nextState);
        }

        return super.shouldComponentUpdate(nextProps, nextState);
    }

    componentWillUpdate(nextProps, nextState) {
        if (_.isFunction(this.props.onComponentWillUpdate)) {
            this.props.onComponentWillUpdate(this, nextProps, nextState);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (_.isFunction(this.props.onComponentDidUpdate)) {
            this.props.onComponentDidUpdate(this, prevProps, prevState);
        }
    }

    componentWillUnmount() {
        if (_.isFunction(this.props.onComponentWillUnmount)) {
            this.props.onComponentWillUnmount(this);
        }
    }

    render() {
        return <div style={{width: '100%'}}>{this.props.children}</div>;
    }
}
