import React, { Component } from 'react'
import store from './../store'

import { bindActionCreators } from './../redux'

import a from '../store/actions/a'

const boundAction = bindActionCreators(a, store.dispatch)

class A extends Component {
  state = {
    num: store.getState().a.num,
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ num: store.getState().a.num }),
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

export default A
