export default function ({ dispatch }) {
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
}
