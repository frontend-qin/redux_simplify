import React, { PureComponent } from 'react';
import { connect } from './../react-redux';
import actions from './../store/actions/b';

class B extends PureComponent {
  render() {
    console.log('B render');
    return (
      <>
        <p>B组件 - {this.props.num}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.jian}>-</button>
        <button onClick={this.props.asyncAdd}>异步+</button>
      </>
    );
  }
}
let mapStateToProps = (state) => state.b;
export default connect(mapStateToProps, actions)(B);
