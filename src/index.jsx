import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import App from './app';

import './index.css';

const MOUNT = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT
);
