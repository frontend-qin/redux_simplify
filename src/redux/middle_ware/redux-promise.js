// promise 中间件
export default function ({ dispatch }) {
  return function (next) {
    return function (action) {
      // 判断 参数是不是 Promise 的实例(不严谨)
      action && action.payload instanceof Promise
        ? action.payload
            .then((res) => dispatch({ ...action, payload: res }))
            .catch((error) => {
              // 处理错误
              console.log(error);
            })
        : next(action);
    };
  };
}
