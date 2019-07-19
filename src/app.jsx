import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchChannels } from './actions/stream-actions';
import { ConnectedChannels as Channels } from './components/channels';
import { Layout } from './components/layout';
import { SEO } from './components/seo';

import { defaultChannels } from './default-channels';

let channels = JSON.parse(localStorage.getItem('jnmorse-twitch-streamers'));

if (!channels) {
  channels = defaultChannels;
  localStorage.setItem(
    'jnmorse-twitch-streamers',
    JSON.stringify(defaultChannels)
  );
}

class App extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchChannels(channels);
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Home"
          description="Keep track of when your favorite Twitch streamers are online"
          keywords={['twitch', 'status']}
        />
        <Channels />
      </Layout>
    );
  }
}

const ConnnectedApp = connect(
  null,
  { fetchChannels }
)(App);

export default ConnnectedApp;
