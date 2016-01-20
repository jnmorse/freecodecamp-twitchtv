import React from 'react';
import ReactDOM from 'react-dom';
import TwitchStreamers from './components/twitchstreamers/main.jsx';

var channels = [
  {id: 1, name: 'freeCodecamp'},
  {id: 2, name: 'OgamingSC2'},
  {id: 3, name: 'storbeck'},
  {id: 4, name: 'terakilobyte'},
  {id: 5, name: 'habathcx'},
  {id: 6, name: 'RobotCaleb'},
  {id: 7, name: 'thomasballinger'},
  {id: 8, name: 'noobs2ninjas'},
  {id: 9, name: 'beohoff'},
  {id: 10, name: 'boris_chantel'},
  {id: 11, name: 'ancelak' }
];

ReactDOM.render(<TwitchStreamers channels={channels} />, document.getElementById('app'));
