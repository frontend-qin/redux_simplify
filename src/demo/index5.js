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
  let listeners = []
  // 得到总的状态树
  function getState() {
    return state
  }
  // 派发动作
  function dispatch(action) {
    // 得到新状态
    state = reducer(state, action)
    // 订阅
    listeners.forEach((fn) => fn())
  }
  // 由于默认 state 树是没有状态的， 是一个控制，所以先派发一次action，给初始状态赋值,
  // 由于用户自己定义的reducer 默认返回初始状态，由于派发的这个type类型找不到，所以默认返回了初始值
  dispatch({ type: '@@REDUX_INIT' })
  // 添加发布订阅模式
  function subscribe(listener) {
    listeners.push(listener)
    // 返回一个取消订阅方法
    return function () {
      listeners = listeners.filter((fn) => fn !== listener)
    }
  }
  return {
    getState,
    dispatch,
    subscribe,
  }
}
let app = {
  name: '我爱罗',
  color: '#f26',
}

// 添加动态改写逻辑
const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_COLOR = 'CHANGE_COLOR'

function reducer(state = app, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      }
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      }
    default:
      return state
  }
}

let store = createStore(reducer)

// 必选先派发action ， 再去触发渲染，不能先渲染，再派发动作
/**
 * 解决办法: 添加发布订阅模式
 */
const AppRender = () => render(store.getState())
// 先调用渲染一次
AppRender()

let unSubscribe = store.subscribe(AppRender)

setTimeout(() => {
  store.dispatch({
    type: CHANGE_NAME,
    name: '手鞠',
  })
  // unSubscribe()
  store.dispatch({
    type: CHANGE_COLOR,
    color: 'blue',
  })
}, 1500)
