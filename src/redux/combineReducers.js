// 合并多个reducer 函数
export default function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers)
  return function (state = {}, action) {
    let hasChanged = false // 此次派发action是否引起了状态的修改， 或者说状态的改变
    const nextState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const previousStateForKey = state[key]
      let nextStateForKey = reducers[key](previousStateForKey, action)
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
