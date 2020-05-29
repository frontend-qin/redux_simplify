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
  promiseAdd() {
    return {
      type: ADDB,
      payload: new Promise((resolve) => {
        setTimeout(() => {
          resolve(5);
        }, 1000);
      }),
    };
  },
};
