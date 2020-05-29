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
      }
      componentDidMount() {
        // console.log(this.context);
        const {
          context: { subscribe, getState },
        } = this;

        this.unsubscribe = subscribe(() =>
          this.setState(mapStateToProps(getState())),
        );
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const {
          state,
          context: { dispatch },
        } = this;
        return (
          <WarpedComponent
            {...state}
            {...bindActionCreators(actions, dispatch)}
          />
        );
      }
    };
  };
}
