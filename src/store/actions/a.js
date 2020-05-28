import { ADDA, JIANA } from '../types'

export default {
  add() {
    return {
      type: ADDA,
    }
  },
  jian() {
    return {
      type: JIANA,
    }
  },
}
