let state = {
  name: '风影嘎拉',
  color: '#f00',
}

function render(obj) {
  const dom = document.getElementById('root')
  dom.innerHTML = obj.name
  dom.style.color = obj.color
}

// 添加动态改写逻辑
const CHANGE_NAME = 'CHANGE_NAME'

function dispatch(action) {
  switch (action.type) {
    case CHANGE_NAME:
      state.name = '手鞠'
      break
    default:
      break
  }
}

dispatch({ type: CHANGE_NAME })

render(state)

/**
  通过添加一个函数， 通过动态改变值的方式
  改成通过派发一个动作，让状态改变，一个动作干一件事
  出现的问题：
    app 变量可以随意改变， 每个人都可以动态改变 app对象 的值
 */
