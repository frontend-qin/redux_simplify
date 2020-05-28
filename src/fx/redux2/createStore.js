export default function createStore(reducer) {
  let state
  let listeners = []
  function getState() {
    return state
  }
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach((fn) => fn())
  }
  dispatch({ type: '@@/REDUX_INIT' })
  function subscribe(listener) {
    listeners.push(listener)
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
