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
  {id: 11, name: 'boris_chantel'},
  {id: 12, name: 'brunofin'},
  {id: 13, name: 'comster404'},
  {id: 14, name: 'ducksauce'},
  {id: 15, name: 'mrhappy1227'},
  {id: 16, name: 'ancelak'}
];

ReactDOM.render(<TwitchStreamers channels={channels} />, document.getElementById('app'));
