import React from 'react';

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

  render: function () {
    /**
     * Title case display state
     * @var display
     */
    var display = this.state.display.toLowerCase().split('');
    display[0] = display[0].toUpperCase();
    display = display.join('');

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
        </section>
      </section>
    );
  }
});
