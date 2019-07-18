import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Channel from './channel';

const listChannels = channel => (
  <Channel key={channel.id} name={channel.name} data={channel.data} />
);

class Channels extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ).isRequired
  };

  state = {
    display: 'all',
    online: [],
    offline: [],
    deleted: [],
    showStream: false
  };

  /* eslint-disable max-lines-per-function */
  componentDidMount() {
    const { list } = this.props;

    list.forEach(async channel => {
      $.ajax({
        url: `https://api.twitch.tv/kraken/streams/${channel.name}`,
        dataType: 'json',
        crossDomain: true,
        headers: {
          Accept: 'application/vnd.twitchtv.v3+json',
          'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
        },

        success: data => {
          // eslint-disable-next-line
          const deleted = this.state.deleted.slice();
          const newData = {};

          if (data.stream) {
            newData.id = channel.id;
            newData.name = channel.name;
            newData.data = data;

            this.setState(prevState => ({
              online: [...prevState.online, newData]
            }));
          } else if (data.stream === undefined) {
            newData.id = channel.id;
            newData.name = channel.name;
            newData.data = null;

            deleted.push(newData);

            this.setState(prevData => ({
              deleted: [...prevData.deleted, newData]
            }));
          } else {
            $.ajax({
              // eslint-disable-next-line no-underscore-dangle
              url: data._links.channel,
              dataType: 'json',
              crossDomain: true,
              headers: {
                Accept: 'application/vnd.twitchtv.v3+json',
                'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
              },

              success: channelData => {
                newData.id = channel.id;
                newData.name = channel.name;
                newData.data = channelData;

                this.setState(prevState => ({
                  offline: [...prevState.offline, newData]
                }));
              }
            });
          }
        },
        error: (a, b, c) => {
          if (c === 'status code 422') {
            const newData = {};

            newData.id = channel.id;
            newData.name = channel.name;

            this.setState(prevState => ({
              deleted: [...prevState.deleted, newData]
            }));
          }
        }
      });
    });
  }
  /* eslint-enable max-lines-per-function */

  showOffline(e) {
    e.preventDefault();

    $('#twitchstreamers-offline')
      .siblings()
      .removeClass('active');
    $('#twitchstreamers-offline').addClass('active');

    this.setState({
      display: 'offline'
    });
  }

  showOnline(e) {
    e.preventDefault();

    $('#twitchstreamers-online')
      .siblings()
      .removeClass('active');
    $('#twitchstreamers-online').addClass('active');

    this.setState({
      display: 'online'
    });
  }

  showAll(e) {
    e.preventDefault();

    $('#twitchstreamers-all')
      .siblings()
      .removeClass('active');
    $('#twitchstreamers-all').addClass('active');

    this.setState({
      display: 'all'
    });
  }

  /* eslint-disable max-lines-per-function */
  render() {
    const { display, offline, online, deleted } = this.state;

    let channelList = '';

    if (display === 'online') {
      channelList = online.map(listChannels);
    } else if (display === 'offline') {
      channelList = offline.map(listChannels);
    } else {
      channelList = online
        .concat(offline)
        .concat(deleted)
        .map(listChannels);
    }

    /* eslint-disable react/jsx-max-depth */
    return (
      <section className="row">
        <div className="col-md-12">
          <header className="hidden">
            <h4>Status</h4>
          </header>

          <nav>
            <ul className="nav nav-pills">
              <li id="twitchstreamers-all" className="active">
                <button type="button" onClick={e => this.showAll(e)}>
                  All
                </button>
              </li>

              <li id="twitchstreamers-online">
                <button type="button" onClick={e => this.showOnline(e)}>
                  Online <span className="badge">{online.length}</span>
                </button>
              </li>

              <li id="twitchstreamers-offline">
                <button type="button" onClick={e => this.showOffline(e)}>
                  Offline <span className="badge">{offline.length}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <section className="col-md-12">
          <header>
            <h2>{display} Channels</h2>
          </header>

          <div className="row">{channelList}</div>
        </section>
      </section>
    );
    /* eslint-enable react/jsx-max-depth */
  }
  /* eslint-enable max-lines-per-function */
}

export default Channels;
