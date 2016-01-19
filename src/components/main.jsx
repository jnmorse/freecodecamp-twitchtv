import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import TwitchStreams from './twitchstreams.jsx';

export default React.createClass({
  footerText: function () {
    return (
      <p>
        This is a project created as part of the courses at freeCodeCamp. This project was designed to make use of the TwitchTV API.
      </p>
    );
  },

  render: function () {
    var social = [
      { id: 1, name: 'Facebook', url: 'https://www.facebook.com/joseph.morse2'},
      { id: 2, name: 'Twitter', url: 'https://twitter.com/tamed_lionheart'},
      { id: 3, name: 'Github', url: 'https://github.com/jnmorse'},
      { id: 4, icon: 'fire', name: 'freeCodecamp', url: 'https://freecodecamp.com/jnmorse'}
    ];

    var channels =[
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

    return (
      <div>
        <Header>Twitch Status</Header>
        <TwitchStreams channels={channels}/>
        <Footer text={this.footerText()} social={social} />
      </div>
    );
  }
});
