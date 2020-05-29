export default function ({ getState }) {
  return function (next) {
    // next 是调用原生的dispatch 方法
    return function (action) {
      console.log(`老状态: ${JSON.stringify(getState())}`);
      next(action);
      console.log(`新状态: ${JSON.stringify(getState())}`);
    };
  };
}
