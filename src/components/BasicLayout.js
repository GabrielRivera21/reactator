import React from 'react';

// TODO: Implement a more useful layout, one with headers and footers maybe?

/**
 * @class
 * @classdesc React component BasicLayout
 * @memberOf module:Reactator
 */
export default class BasicLayout extends React.PureComponent {
    render() {
        return (
          <div  style={{width: '100%'}}>
            {this.props.children}
          </div>
        );
    }
}
