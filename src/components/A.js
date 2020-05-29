import React, { PureComponent } from 'react';
import { connect } from './../react-redux';
import actions from './../store/actions/a';
class A extends PureComponent {
  render() {
    console.log('A render');

    return (
      <>
        <p>A组件 - {this.props.num}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.jian}>-</button>
      </>
    );
  }
}

let mapStateToProps = (state) => state.a;

let mapDispatchToProps = (dispatch) => ({
  add() {
    dispatch({ type: 'ADDA' });
  },
  jian() {
    dispatch({ type: 'JIANA' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(A);
