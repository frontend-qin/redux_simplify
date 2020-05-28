/**
 * 将action进行绑定， 主要为了简化语法
 * @param {*} actionCreators
 * @param {*} dispatch
 */
export default function bindActionCreators(actionCreators, dispatch) {
  function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
  }
  // 判断bindActionCreators 参数可能是函数， 也可能是对象
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  // 如果是对象
  let boundActionCreators = {}
  // 循环这个对象
  for (const key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch)
  }
  return boundActionCreators
}

// 传函数
/**
  let add = () => ({
    type: ADD,
  })
  let cut = (p) => ({
    type: CUT,
    num: p,
  })
  add = bindActionCreators(add, store.dispatch)
  cut = bindActionCreators(cut, store.dispatch)
 */
