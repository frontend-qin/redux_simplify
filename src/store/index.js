import { createStore } from './../redux';

import reducers from './reducers';

function compose(...fns) {
  if (fns.length === 0) return (args) => args;
  if (fns.length === 1) return (...args) => fns[0](...args);
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

const logger = function ({ getState, dispatch }) {
  return function (next) {
    // next 是调用原生的dispatch 方法
    return function (action) {
      console.log(`老状态: ${JSON.stringify(getState())}`);
      next(action);
      console.log(`新状态: ${JSON.stringify(getState())}`);
    };
  };
};

const thunk = function ({ dispatch }) {
  return function (next) {
    // next 是调用原生的dispatch 方法
    return function (action) {
      // 判断 action 是个函数
      if (typeof action === 'function') {
        action(dispatch);
      } else {
        next(action);
      }
    };
  };
};

function applyMiddleWare(...middleWares) {
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

let store = applyMiddleWare(thunk, logger)(createStore)(reducers);

export default store;
