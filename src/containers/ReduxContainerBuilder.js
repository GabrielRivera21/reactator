import {connect} from 'react-redux';

// TEST:

/**
 * @class
 * @classdesc react-redux container builder
 * @memberOf module:Reactator
 */
export default class ReduxContainerBuilder {
    constructor() {
        /** @member {function} */
        this.mapStateToProps = undefined;

        /** @member {function} */
        this.mapDispatchToProps = undefined;

        /** @member {function} */
        this.mergeProps = undefined;

        /** @member {Object} */
        this.options = undefined;

        /** @member {ReduxComponent} */
        this.component = undefined;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#withMapStateToProps
     *
     * @param {function} mapStateToProps - function mapping state to props
     *
     * @return {ReduxContainerBuilder} this builder
     */
    withMapStateToProps(mapStateToProps) {
        this.mapStateToProps = mapStateToProps;
        return this;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#withMapDispatchToProps
     *
     * @param {function} mapDispatchToProps - function mapping dispatch to props
     *
     * @return {ReduxContainerBuilder} this builder
     */
    withMapDispatchToProps(mapDispatchToProps) {
        this.mapDispatchToProps = mapDispatchToProps;
        return this;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#withMergeProps
     *
     * @param {function} mergeProps - function mergin props
     *
     * @return {ReduxContainerBuilder} this builder
     */
    withMergeProps(mergeProps) {
        this.mergeProps = mergeProps;
        return this;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#withOptions
     *
     * @param {Object} options - options for react-redux
     *
     * @return {ReduxContainerBuilder} this builder
     */
    withOptions(options) {
        this.options = options;
        return this;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#withComponent
     *
     * @param {ReduxComponent} component - component to connect
     *
     * @return {ReduxContainerBuilder} this builder
     */
    withComponent(component) {
        this.component = component;
        return this;
    }

    /**
     * @method module:Reactator.ReduxContainerBuilder#build
     *
     * @return {ReactElement} redux element connecting container to component
     */
    build() {
        return connect(
            this.mapStateToProps,
            this.mapDispatchToProps,
            this.mergeProps,
            this.options)(this.component);
    }
}
