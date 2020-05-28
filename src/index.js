import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from './redux'
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
        num: state.num - action.num,
      }
    default:
      return state
  }
}

let store = createStore(reducer)

// 如果是函数
// let add = () => ({
//   type: ADD,
// })
// let cut = (p) => ({
//   type: CUT,
//   num: p,
// })
// // 让dispatch 的派发动作让函数内部帮我实现
// add = bindActionCreators(add, store.dispatch)
// cut = bindActionCreators(cut, store.dispatch)

// 如果是对象
let actions = {
  add() {
    return {
      type: ADD,
    }
  },
  cut(p) {
    return {
      type: CUT,
      num: p,
    }
  },
}
actions = bindActionCreators(actions, store.dispatch)

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
        <button onClick={actions.add}>+</button>
        <button onClick={() => actions.cut(3)}>-</button>
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
