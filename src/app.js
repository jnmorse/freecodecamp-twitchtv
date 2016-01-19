/* eslint-disable no-unused-vars */
/**
 * Added Rule to disable eslint complaining about React being unused
 * Is required for ReactDOM
 */
import React from 'react';
/* eslint-enable no-unused-vars */

import ReactDOM from 'react-dom';

var document = window.document;

import Main from './components/main.jsx';

ReactDOM.render(<Main />, document.getElementById('main'));
