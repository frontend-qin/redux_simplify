function render(obj) {
  const dom = document.getElementById('root')
  dom.innerHTML = obj.name
  dom.style.color = obj.color
}

// 添加动态改写逻辑
const CHANGE_NAME = 'CHANGE_NAME'

/**
 *
 * 进行变量私有化
 * 函数，闭包
 */

function createStore() {
  let app = {
    name: '我爱罗',
    color: '#f26',
  }
  function getState() {
    return app
  }
  function dispatch(action) {
    switch (action.type) {
      case CHANGE_NAME:
        app.name = '手鞠'
        break
      default:
        break
    }
  }
  return {
    getState,
    dispatch,
  }
}

let store = createStore()

store.dispatch({
  type: CHANGE_NAME,
})

render(store.getState())

/**
 * 此时存在的问题, 初始状态写死了
 * 也不能改变
 *
 */
