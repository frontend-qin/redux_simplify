/**
 * 将action进行绑定， 主要为了简化语法
 * 不适用它时， 需要自己手动 dispatch 一个action， => store.dispatch(action)
 *  使用它后， 把 dispatch 作为参数， 让函数内部帮你派发动作， 简化一下语法
 *
 * @param {*} actionCreators 也就是 创建action 的函数   {type：ADD}
 * @param {*} dispatch store提供的 dispatch 方法
 */

export default function bindActionCreators(actionCreators, dispatch) {
  function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
  }
  // 判断bindActionCreators 参数可能是函数， 也可能是对象
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  // 如果 actionCreators 参数 是对象
  let boundActionCreators = {}
  // 循环这个对象
  for (const key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch)
  }
  // 返回包装过后的对象
  return boundActionCreators
}
