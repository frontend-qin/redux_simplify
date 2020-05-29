/*
import React from 'react'
import ReactDOM from 'react-dom'
import A from './components/A'
import B from './components/B'

ReactDOM.render(
  <>
    <A />
    <B />
  </>,
  document.getElementById('root'),
)
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();
class About extends Component {
  static contextType = MyContext;
  render() {
    return <div>About类组件收到消息：{this.context}</div>;
  }
}
class Home extends Component {
  static contextType = MyContext;
  render() {
    return <div>Home类组件收到消息：{this.context}</div>;
  }
}

const Shop = () => {
  return (
    <MyContext.Consumer>
      {(value) => <div>Shop函数组件收到消息：{value}</div>}
    </MyContext.Consumer>
  );
};
class App extends Component {
  state = {
    msg: '我是首领',
  };
  render() {
    return (
      <MyContext.Provider value={this.state.msg}>
        <About />
        <Home />
        <Shop />
      </MyContext.Provider>
    );
  }
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root'),
);
