import a from './a'
import b from './b'

import { combineReducers } from './../../redux'

// 合并a, b 两个reducer
// export default function (state = {}, action) {
//   let newState = {}
//   newState.a = a(state.a, action)
//   newState.b = b(state.b, action)
//   return newState
// }
export default combineReducers({
  a,
  b,
})
