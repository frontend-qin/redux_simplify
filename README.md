# 1. Redux 应用场景

- 随着 JavaScript 单页应用开发日趋复杂,管理不断变化的 state 非常困难
- Redux 的出现就是为了解决 state 里的数据问题
- 在 React 中，数据在组件中是单向流动的
- 数据从一个方向父组件流向子组件(通过 props)，由于这个特征，两个非父子关系的组件（或者称作兄弟组件）之间的通信就比较麻烦

# 2. 设计思想

- Redux 是将整个应用状态存储到一个地方， 成为 store, 里边保存一棵状态树（state tree）
- 组件可以派发 dispatch 行为（action） 给 store， 而不是直接通知其它组件
- 组件可以通过订阅 store 中的状态（state） 来刷新自己的试图

# 3. Redux 三原则

- 整个应用的 state 被存储在 一颗 object tree 中， 并且这个 object tree 只存在于唯一 一个 store 中
- State 是只读的， 唯一改变 state 的方法， 就是触发 action， action 是一个用于描述已发生事件的普通对象， 使用纯函数来执行修改， 为了描述 action 如何改变 state tree， 就需要编写 reducers
- 单一数据源的设计让 React 组件之间的通信更加方便，便于状态的统一管理

# 4. 20 行代码一步步，手写 redux

```javascript
function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  }
  dispatch({ type: '@@REDUX_INIT' });
  function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

# 5. bindActionCreators

```javascript
export default function bindActionCreators(actionCreators, dispatch) {
  function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args));
  }
  // 判断bindActionCreators 参数可能是函数， 也可能是对象
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  // 如果是对象
  let boundActionCreators = {};
  // 循环这个对象
  for (const key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  }
  return boundActionCreators;
}
```

# 6. 实现 react-redux

- index.js

```javascript
import Provider from './Provider';
import connect from './connect';
export { Provider, connect };
```

- context.js

```javascript
import React from 'react';
export default React.createContext();
```

- Provider.js

```javascript
import React, { Component } from 'react';
import ReduxContext from './context';
class Provider extends Component {
  render() {
    const { store, children } = this.props;
    return (
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    );
  }
}
export default Provider;
```

- connect.js

```javascript
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
```

# 7. 实现 redux 中间价

```javascript
import compose from './compose';
export default function applyMiddleWare(...middleWares) {
  return function (createStore) {
    return function (...args) {
      let store = createStore(...args);
      let dispatch;
      let middleWareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };
      const chain = middleWares.map((middleWare) => middleWare(middleWareAPI));

      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}
```

# 8. 实现 compose

```javascript
export default function compose(...fns) {
  if (fns.length === 0) return (args) => args;
  if (fns.length === 1) return (...args) => fns[0](...args);
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
```

# 9. 实现 compose

```javascript
export default function compose(...fns) {
  if (fns.length === 0) return (args) => args;
  if (fns.length === 1) return (...args) => fns[0](...args);
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
```

# 10. 实现 合并 reducer

```javascript
export default function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers);
  return function (state = {}, action) {
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const previousStateForKey = state[key];
      let nextStateForKey = reducers[key](previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
```

# 11. 实现一个中间件 redux-logger

```javascript
export default function ({ getState }) {
  return function (next) {
    return function (action) {
      console.log(`老状态: ${JSON.parse(JSON.stringify(getState()))}`);
      next(action);
      console.log(`新状态: ${JSON.parse(JSON.stringify(getState()))}`);
    };
  };
}
```

# 12. 实现一个中间件 redux-thunk

```javascript
export default function ({ dispatch }) {
  return function (next) {
    return function (action) {
      typeof action === 'function' ? action(dispatch) : next(action);
    };
  };
}
```

# 13. 实现一个中间件 redux-promise

```javascript
export default function ({ dispatch }) {
  return function (next) {
    return function (action) {
      // 判断 参数是不是 Promise 的实例(不严谨)
      action && action.payload instanceof Promise
        ? action.payload
            .then((res) => dispatch({ ...action, payload: res }))
            .catch((error) => {
              console.log(error);
            })
        : next(action);
    };
  };
}
```
