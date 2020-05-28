import React, { Component } from 'react'
import store from './../store'

import { bindActionCreators } from './../redux'

import b from '../store/actions/b'

const boundAction = bindActionCreators(b, store.dispatch)

class B extends Component {
  state = {
    num: store.getState().b.num,
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ num: store.getState().b.num }),
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={boundAction.add}>+</button>
        <button onClick={boundAction.jian}>-</button>
      </div>
    )
  }
}

export default B
