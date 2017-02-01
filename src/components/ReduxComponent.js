// TEST:

/**
 * @namespace ReduxComponet
 * @classdesc ReduxComponet
 * @memberOf module:Reactator
 */

/**
 * @method module:Reactator.ReduxComponet#ReduxComponet
 *
 * @example
 * export default ReduxComponent({
 *     foo: PropTypes.string.isRequired
 * }, (props) => {
 *     return <div>{this.props.foo}</div>;
 * });
 *
 * @param {Object} props - props for the component
 * @param {function} func - the render method
 * @return {function} function with propTypes set properly for react-redux
 */
export default function ReduxComponet(props, func) {
    func.propTypes = props;
    return func;
}
