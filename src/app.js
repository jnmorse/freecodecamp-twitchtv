/* eslint-disable no-unused-vars */
/**
 * Added Rule to disable eslint complaining about React being unused
 * Is required for ReactDOM
 */
var React = require('react');
// import React from 'react';
/* eslint-enable no-unused-vars */

// import ReactDOM from 'react-dom';
var ReactDOM = require('react-dom');

// import Main from './components/main.jsx';

ReactDOM.render(<Main />, document.getElementById('main'));
