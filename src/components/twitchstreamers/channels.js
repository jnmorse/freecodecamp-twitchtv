import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Channel from './channel';

const listChannels = channel => (
  <Channel key={channel.id} name={channel.name} data={channel.data} />
);

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'all',
      online: [],
      offline: [],
      deleted: [],
      showStream: false
    };
  }

  static get propTypes() {
    return{
      list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })).isRequired
    };
  }

  componentDidMount() {
    this.props.list.forEach((channel) => {
      $.ajax({
        url: `https://api.twitch.tv/kraken/streams/${channel.name}`,
        dataType: 'json',
        crossDomain: true,
        headers: {
          Accept: 'application/vnd.twitchtv.v3+json',
          'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
        },

        success: (data) => {
          const online = this.state.online.slice();
          const deleted = this.state.deleted.slice();
          const newData = {};

          if (data.stream) {
            newData.id = channel.id;
            newData.name = channel.name;
            newData.data = data;

            online.push(newData);

            this.setState({ online });
          } else if (data.stream === undefined) {
            newData.id = channel.id;
            newData.name = channel.name;
            newData.data = null;

            deleted.push(newData);

            this.setState({ deleted });
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

              success: (channelData) => {
                const offline = this.state.offline.slice();

                newData.id = channel.id;
                newData.name = channel.name;
                newData.data = channelData;

                offline.push(newData);

                this.setState({ offline });
              }
            });
          }
        },
        error: (a, b, c) => {
          if (c === 'status code 422') {
            const deleted = this.state.deleted.slice();
            const newData = {};

            newData.id = channel.id;
            newData.name = channel.name;

            deleted.push(newData);

            this.setState({ deleted });
          }
        }
      });
    });
  }

  showOffline(e) {
    e.preventDefault();

    $('#twitchstreamers-offline').siblings().removeClass('active');
    $('#twitchstreamers-offline').addClass('active');

    this.setState({
      display: 'offline'
    });
  }

  showOnline(e) {
    e.preventDefault();

    $('#twitchstreamers-online').siblings().removeClass('active');
    $('#twitchstreamers-online').addClass('active');

    this.setState({
      display: 'online'
    });
  }

  showAll(e) {
    e.preventDefault();

    $('#twitchstreamers-all').siblings().removeClass('active');
    $('#twitchstreamers-all').addClass('active');

    this.setState({
      display: 'all'
    });
  }

  render() {
    let display = this.state.display.toLowerCase().split('');
    let channelList = '';

    display[0] = display[0].toUpperCase();
    display = display.join('');

    if (this.state.display === 'online') {
      channelList = this.state.online
        .map(listChannels);
    } else if (this.state.display === 'offline') {
      channelList = this.state.offline
        .map(listChannels);
    } else {
      channelList = this.state.online
        .concat(this.state.offline)
        .concat(this.state.deleted)
        .map(listChannels);
    }

    return(
      <section className="row">
        <div className="col-md-12">
          <header className="hidden">
            <h4>Status</h4>
          </header>

          <nav>
            <ul className="nav nav-pills">
              <li id="twitchstreamers-all" className="active">
                <a onClick={e => this.showAll(e)} href="#">All</a>
              </li>

              <li id="twitchstreamers-online">
                <a
                  onClick={e => this.showOnline(e)}
                  href="#"
                >
                  Online <span className="badge">{this.state.online.length}</span>
                </a>
              </li>

              <li id="twitchstreamers-offline">
                <a
                  onClick={e => this.showOffline(e)}
                  href="#"
                >
                  Offline <span className="badge">{this.state.offline.length}</span>
                </a>
              </li>
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
}

export default Channels;
