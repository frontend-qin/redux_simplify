function render(obj) {
  const dom = document.getElementById('root')
  dom.innerHTML = obj.name
  dom.style.color = obj.color
}

/**
 *
 * 进行变量私有化
 * 函数，闭包
 */

function createStore(reducer) {
  // 默认初始状态
  let state
  // 得到总的状态树
  function getState() {
    return state
  }
  // 派发动作
  function dispatch(action) {
    // 得到新状态
    state = reducer(state, action)
  }
  // 由于默认 state 树是没有状态的， 是一个控制，所以先派发一次action，给初始状态赋值,
  // 由于用户自己定义的reducer 默认返回初始状态，由于派发的这个type类型找不到，所以默认返回了初始值
  dispatch({ type: '@@REDUX_INIT' })
  return {
    getState,
    dispatch,
  }
}
let app = {
  name: '我爱罗',
  color: '#f26',
}

// 添加动态改写逻辑
const CHANGE_NAME = 'CHANGE_NAME'

function reducer(state = app, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      }
    default:
      return state
  }
}
render(store.getState())
let store = createStore(reducer)

store.dispatch({
  type: CHANGE_NAME,
  name: '手鞠',
})

/**
 * 此时存在的问题, 初始状态写死了，也不能改变
 *
 * 改进：
 *  1. 希望， 数据源，和具体的改变操作都希望用户自己控制
 *
 * 存在问题， 必选先派发action ， 再去触发渲染，不能先渲染，再派发动作
 */
