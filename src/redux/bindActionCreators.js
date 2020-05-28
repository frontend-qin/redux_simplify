export default function bindActionCreators(actionCreators, dispatch) {
  function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
  }
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
}
