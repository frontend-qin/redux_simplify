import React, { Component } from 'react';
import ReduxContext from './context';
import { bindActionCreators } from '../redux';

export default function connect(mapStateToProps, actions) {
  return function (WarpedComponent) {
    return class extends Component {
      static contextType = ReduxContext;
      constructor(props, context) {
        super(props, context);
        this.state = mapStateToProps(context.getState());
        // 优化，进行浅比较
        this.boundActions = bindActionCreators(actions, context.dispatch);
      }
      componentDidMount() {
        // console.log(this.context);
        const { context } = this;
        this.unsubscribe = context.subscribe(() =>
          this.setState(mapStateToProps(context.getState())),
        );
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return <WarpedComponent {...this.state} {...this.boundActions} />;
      }
    };
  };
}
