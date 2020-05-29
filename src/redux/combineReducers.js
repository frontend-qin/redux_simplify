// 合并多个reducer 函数
export default function combineReducers(reducers) {
  // 拿到所有的对象的key 组成的数组
  let reducerKeys = Object.keys(reducers);
  // 返回一个函数
  return function (state = {}, action) {
    // 此次派发action是否引起了状态的修改， 或者说状态的改变
    let hasChanged = false;
    // 定义一个空对象
    const nextState = {};
    // 循环所有的key组成的那个数组
    for (let i = 0; i < reducerKeys.length; i++) {
      // 拿到每一个key
      const key = reducerKeys[i];
      // 拿到老的状态对象的值
      const previousStateForKey = state[key];
      // 调用这个 `reducers[key]` 的值是个函数
      let nextStateForKey = reducers[key](previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
