import React, { Component } from 'react';
class Header extends Component {
  render() {
    return <div style={{ border: '5px solid green' }}>header</div>;
  }
}
class Main extends Component {
  render() {
    return <div style={{ border: '5px solid orage' }}>main</div>;
  }
}
class Context extends Component {
  render() {
    return (
      <div style={{ border: '5px solid red' }}>
        <Header />
        <Main />
      </div>
    );
  }
}

export default Context;
