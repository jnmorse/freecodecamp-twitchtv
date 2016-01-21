import React from 'react';
import Channel from './channel.jsx';

/* global $ */
export default React.createClass({
  getInitialState: function () {
    return {
      display: 'all',
      online: [],
      offline: [],
      deleted: []
    };
  },

  showAll: function (e) {
    e.preventDefault();

    this.setState({
      display: 'all'
    });
  },

  showOnline: function (e) {
    e.preventDefault();

    this.setState({
      display: 'online'
    });
  },

  showOffline: function (e) {
    e.preventDefault();

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
            var online = this.state.online.slice();
            var deleted = this.state.deleted.slice();
            var newData = {};

            if (Boolean(data.stream)) {
              newData.id = channel.id;
              newData.name = channel.name;
              newData.data = data;

              online.push(newData);

              this.setState({
                online: online
              });
            } else if (data.stream === undefined) {
              newData.id = channel.id;
              newData.name = channel.name;
              newData.data = null;

              deleted.push(newData);

              this.setState({
                deleted: deleted
              });
            } else {
              $.ajax({
                url: data._links.channel,
                dataType: 'json',
                crossDomain: true,
                headers: {
                  'Accept': 'application/vnd.twitchtv.v3+json'
                },

                success: function (channelData) {
                  var offline = this.state.offline.slice();
                  var newData = {};

                  newData.id = channel.id;
                  newData.name = channel.name;
                  newData.data = channelData;

                  offline.push(newData);

                  this.setState({
                    offline: offline
                  });
                }.bind(this)
              });
            }
          }
        }.bind(this),
        error: function(a, b, c) {
          if (c === 'status code 422') {
            var deleted = this.state.deleted.slice();
            var newData = {};

            newData.id = channel.id;
            newData.name = channel.name;

            deleted.push(newData);

            this.setState({
              deleted: deleted
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
    var channelList = '';

    display[0] = display[0].toUpperCase();
    display = display.join('');

    if (this.state.display === 'online') {
      channelList = this.state.online
        .map(this.listChannels);
    } else if (this.state.display === 'offline') {
      channelList = this.state.offline
        .map(this.listChannels);
    } else {
      channelList = this.state.online
        .concat(this.state.offline)
        .concat(this.state.deleted)
        .map(this.listChannels);
    }

    return (
      <section className="row">
        <div className="col-md-12">
          <header className="hidden">
            <h4>Status</h4>
          </header>

          <nav>
            <ul className="nav nav-pills">
              <li className="active"><a onClick={this.showAll} href="#">All</a></li>
              <li><a onClick={this.showOnline} href="#">Online <span className="badge">{this.state.online.length}</span></a></li>
              <li><a onClick={this.showOffline} href="#">Offline <span className="badge">{this.state.offline.length}</span></a></li>
            </ul>
          </nav>
        </div>

        <section className="col-md-12">
          <header>
            <h2>{display} Channels</h2>
          </header>

          <div className="row">
            {channelList}
          </div>
        </section>
      </section>
    );
  }
});
