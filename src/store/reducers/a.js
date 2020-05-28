import { ADDA, JIANA } from '../types'

let initState = {
  num: 1,
}
export default function a(state = initState, action) {
  switch (action.type) {
    case ADDA:
      return {
        num: state.num + 1,
      }

    case JIANA:
      return {
        num: state.num - 1,
      }
    default:
      return state
  }
}
