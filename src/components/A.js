import React, { Component } from 'react';
import { connect } from './../react-redux';
import actions from './../store/actions/a';
class A extends Component {
  render() {
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

export default connect(mapStateToProps, actions)(A);
