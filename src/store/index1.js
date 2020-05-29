import { createStore } from './../redux';

import reducers from './reducers';

// redux 中间件核心： 对dispatch 方法进行重写，在派发前或者派发后，处理自己的逻辑
// let dispatch = store.dispatch;
// store.dispatch = function (action) {
//   console.log(`老状态: ${JSON.stringify(store.getState())}`);
//   dispatch(action);
//   console.log(`新状态: ${JSON.stringify(store.getState())}`);
// };

// 日志打印中间件
/**
 *
 * @param {*} getState 获取到状态
 * @param {*} dispatch 重新派发动作
 */
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
// 异步中间价
// 会走两次
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
// 中间件原理
function applyMiddleWare(middleWare) {
  return function (createStore) {
    return function (reducers) {
      let store = createStore(reducers);
      let dispatch;
      middleWare = middleWare({
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      });
      dispatch = middleWare(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

let store = applyMiddleWare(thunk)(createStore)(reducers);

export default store;
