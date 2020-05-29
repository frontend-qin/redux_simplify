import { ADDB, JIANB } from '../types';

export default {
  add() {
    return {
      type: ADDB,
    };
  },
  jian() {
    return {
      type: JIANB,
    };
  },
  asyncAdd() {
    return function (dispatch) {
      setTimeout(() => {
        dispatch({ type: ADDB });
      }, 1000);
    };
  },
};
