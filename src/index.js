import React from 'react';
import ReactDOM from 'react-dom';
import A from './components/A';
import B from './components/B';

import { Provider } from './react-redux';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <A />
    <B />
  </Provider>,
  document.getElementById('root'),
);
