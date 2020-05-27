import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from './redux'
const ADD = 'ADD'
const CUT = 'CUT'

function reducer(state = { num: 1 }, action) {
  switch (action.type) {
    case ADD:
      return {
        num: state.num + 1,
      }
    case CUT:
      return {
        num: state.num - 1,
      }
    default:
      return state
  }
}

let store = createStore(reducer)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: store.getState().num,
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ num: store.getState().num }),
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={() => store.dispatch({ type: ADD })}>+</button>
        <button onClick={() => store.dispatch({ type: CUT })}>-</button>
      </div>
    )
  }
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root'),
)
