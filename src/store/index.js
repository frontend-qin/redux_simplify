import { createStore } from './../redux';

import reducers from './reducers';

import { applyMiddleWare } from './../redux';

import promise from './../redux/middle_ware/redux-promise';
import thunk from './../redux/middle_ware/redux-thunk';
import logger from './../redux/middle_ware/redux-logger';

// 中间件执行是有顺序的
let store = applyMiddleWare(promise, thunk, logger)(createStore)(reducers);

export default store;
