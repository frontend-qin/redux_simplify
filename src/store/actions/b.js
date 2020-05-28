import { ADDB, JIANB } from '../types'

export default {
  add() {
    return {
      type: ADDB,
    }
  },
  jian() {
    return {
      type: JIANB,
    }
  },
}
