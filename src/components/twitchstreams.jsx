import React from 'react';
import Channels from './twitch/channels.jsx';
import jQuery from 'jquery';

var $ = jQuery;

export default React.createClass({
  getInitialState: function () {
    return {
      display: 'all',
      channels: []
    };
  },

  componentDidMount: function () {
    this.props.channels.map(function (channel) {
      $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/' + channel.name,
        dataType: 'json',
        crossDomain: true,
        headers: {
          'Accept': 'application/vnd.twitchtv.v3+json'
        },

        success: function  (data) {
          if (this.isMounted()) {
            var newState = this.state.channels.slice();
            var newData = {};

            newData.id = channel.id;
            newData.name = channel.name;
            newData.data = data;

            newState.push(newData);

            this.setState({
              channels: newState
            });
          }
        }.bind(this),

        error: function(xhr, status, err) {
          $('body').appendTo('<p>' + err.toString() + '</p>');
        }.bind(this)});
    }.bind(this));
  },

  showAll: function () {
    this.setState({
      display: 'all'
    });
  },

  showOnline: function () {
    this.setState({
      display: 'online'
    });
  },

  onlineChannels: function (channel) {
    return channel.data.stream;
  },

  offlineChannels: function (channel) {
    return channel.data.stream === null;
  },

  render: function () {
    var online = this.state.channels.filter(this.onlineChannels);
    var offline = this.state.channels.filter(this.offlineChannels);

    return (
      <main>
        <ul>
          <li><a href='' onClick={this.showAll}>All</a></li>
          <li><a href='' onClick={this.showOnline}>Online</a></li>
          <li><a href=''>Offline</a></li>
        </ul>

        <section id="online" className="container">
          <header>
            <h2>Users Online</h2>
          </header>

          <div className="row">
            <Channels list={online}/>
          </div>
        </section>

        <section id="offline" className="container">
          <header>
            <h2>Users Offline</h2>
          </header>

          <Channels list={offline}/>
        </section>
      </main>
    );
  }
});
