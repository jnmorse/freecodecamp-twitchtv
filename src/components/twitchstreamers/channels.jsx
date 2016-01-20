import React from 'react';
import Channel from './channel.jsx';

/* global $ */
export default React.createClass({
  getInitialState: function () {
    return {
      display: 'all',
      channels: []
    };
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

  showOffline: function () {
    this.setState({
      display: 'offline'
    });
  },

  componentDidMount: function () {
    this.props.list.map(function (channel) {
      $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/' + channel.name,
        dataType: 'json',
        crossDomain: true,
        headers: {
          'Accept': 'application/vnd.twitchtv.v3+json'
        },

        success: function (data) {
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
        }.bind(this)
      });
    }.bind(this));
  },

  filterOnlineChannels: function (channel) {
    if (Boolean(channel.data.stream)) {
      return true;
    } else {
      return false;
    }
  },

  filterOfflineChannels: function (channel) {
    if (channel.data.stream === null) {
      return true;
    } else {
      return false;
    }
  },

  listChannels: function (channel) {
    return (
      <Channel key={channel.id} name={channel.name} data={channel.data} />
    );
  },

  render: function () {
    /**
     * Title case display state
     * @var display
     */
    var display = this.state.display.toLowerCase().split('');

    display[0] = display[0].toUpperCase();
    display = display.join('');

    var channelList = this.state.channels.map(this.listChannels);

    if (this.state.display === 'online') {
      channelList = this.state.channels
        .filter(this.filterOnlineChannels)
        .map(this.listChannels);
    } else if (this.state.display === 'offline') {
      channelList = this.state.channels
        .filter(this.filterOfflineChannels)
        .map(this.listChannels);
    }

    return (
      <section>
        <header>
          <h4>Status</h4>
        </header>

        <nav>
          <ul>
            <li onClick={this.showAll}>All</li>
            <li onClick={this.showOnline}>Online</li>
            <li onClick={this.showOffline}>Offline</li>
          </ul>
        </nav>

        <section>
          <header>
            <h2>{display} Channels</h2>
          </header>

          <div>
            {channelList}
          </div>
        </section>
      </section>
    );
  }
});
