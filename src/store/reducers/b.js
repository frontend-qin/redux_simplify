import { ADDB, JIANB } from '../types';

let initState = {
  num: 0,
};
export default function b(state = initState, action) {
  switch (action.type) {
    case ADDB:
      return {
        num: state.num + action.payload || 1,
      };

    case JIANB:
      return {
        num: state.num - 1,
      };
    default:
      return state;
  }
}
